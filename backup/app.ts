import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const fs = require('fs');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const botDatabasePath = 'bot-database.json';
const botDatabaseName = botDatabasePath.replace('.json', '');
if (!fs.existsSync(botDatabasePath)) {
  fs.writeFileSync(botDatabasePath, JSON.stringify({ authorizedChats: [] }), { encoding: 'utf8' });
}

const authorizedChatsPath = '/authorizedChats'
const db = new JsonDB(new Config(botDatabaseName, true, true, '/'));
if (!db.count(authorizedChatsPath)) {
  db.push(authorizedChatsPath, []);
}

const {
  TELEGRAM_BOT_TOKEN, SUPERADMIN_TOKEN,
  PG_DB_HOST, PG_DB_PORT, PG_DB_USER, PG_DB_PASSWORD, PG_DB_NAME,
} = process.env;

const authorizationTokens = [SUPERADMIN_TOKEN];

const settify = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
}

const getAuthorizedChats = (): number[] => {
  return db.getData(authorizedChatsPath).map(i => parseInt(i))
}

const authenticateChat = (chatId: number) => {
  db.push(authorizedChatsPath, settify([...(db.getData(authorizedChatsPath)), chatId]), true);
}

const unAuthenticateChat = (chatId: number) => {
  db.push(authorizedChatsPath, settify(db.getData(authorizedChatsPath).filter(id => id !== chatId)), true);
}

const isAuthenticatedChat = (chatId: number): boolean => getAuthorizedChats().includes(chatId);

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout? stdout : stderr);
    });
  });
}

async function sendBackupToGoogleDrive(backupName) {
  return await execShellCommand('node google-drive.js ' + backupName);
}

async function makeBackup(): Promise<string> {
  const filename = `${(new Date()).toISOString()}.sql`;
  const backupPath = `./backups/${filename}`;
  const backupCommand = `PGPASSWORD="${PG_DB_PASSWORD}" pg_dump -h ${PG_DB_HOST} -p ${PG_DB_PORT} -U ${PG_DB_USER} ${PG_DB_NAME} > ${backupPath}`;
  await execShellCommand(backupCommand);
  return filename;
}

async function makeBackupAndSendToGoogleDrive(): Promise<string> {
  const filename = await makeBackup();
  await sendBackupToGoogleDrive(filename);
  return filename;
}

async function makeBackupAndSendToGoogleDriveAndSendMessageToUsersIfFailed(): Promise<string> {
  try {
    const filename = await makeBackupAndSendToGoogleDrive();
    return filename;
  } catch (error) {
    sendMessageToAllAuthenticatedChats(`Failed to make backup!\nError:\n${error}`);
  }
}

function getBackupsCount(): Promise<string> {
  return new Promise((resolve, reject) => {
    const dir = './backups';
    fs.readdir(dir, (err, files) => {
      resolve(files.length);
    });
  });
}

function sendMessageToAllAuthenticatedChats(message: string) {
  getAuthorizedChats().forEach((chatId) => {
    ;(async () => {
      await bot.sendMessage(chatId, `Number of backups: ${await getBackupsCount()}`);
    })();
  });
}

async function sendBackupsCountToAllAuthenticatedChats() {
  sendMessageToAllAuthenticatedChats(`Number of backups: ${await getBackupsCount()}`);
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: true});
bot.on('message', async (message) => {
  const chatId = message.chat.id;
  console.log(`Got a message from chatId: ${chatId}, text: ${message.text}, chat username: ${message.chat.username}`);
  if (message.text === '/start') {
    bot.sendMessage(chatId, 'Hello from xhack.dev backup bot!');
  }
  if (message.text.startsWith('/a')) {
    const authToken = message.text.replace('/a ', '');
    if (!authorizationTokens.includes(authToken)) {
      bot.sendMessage(chatId, 'Invalid token!');
    }
    authenticateChat(chatId);
    bot.sendMessage(chatId, 'You have been successfully authorized!');
    return;
  }
  if (!isAuthenticatedChat(chatId)) {
    bot.sendMessage(message.chat.id, 'Please authenticates first!');
    return;
  }
  if (message.text.startsWith('/logout')) {
    unAuthenticateChat(chatId);
    bot.sendMessage(chatId, 'You have been successfully logged out!');
    return;
  }
  if (message.text.startsWith('/count')) {
    bot.sendMessage(chatId, `Number of backups: ${await getBackupsCount()}`);
    return;
  }
  if (message.text.startsWith('/backup')) {
    await makeBackupAndSendToGoogleDriveAndSendMessageToUsersIfFailed();
    bot.sendMessage(message.chat.id, 'Backup successfully created!');
    return;
  }
  bot.sendMessage(message.chat.id, 'Unknown command!');
  return;
});

/**
 * Cron every hour
 */
cron.schedule('0 * * * *', async () => {
  try {
    await makeBackup();
  } catch (error) {
    sendMessageToAllAuthenticatedChats(`Failed to make backup!\nError:\n${error}`);
  }
});

/**
 * Every day at 6pm
 */
cron.schedule('0 18 * * *', async () => {
  await sendBackupsCountToAllAuthenticatedChats();
});
