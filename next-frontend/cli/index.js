const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const templates = require('./templates');

const args = process.argv.slice(2);

const verb = _.first(args);

const supportedVerbs = ['g', 'help'];

if (!supportedVerbs.includes(verb)) {
    console.error('Unsupported command. Please use help to list commands');
    return;
}

if (verb === 'help') {
    console.log(`Supported commands: g, help`);
    return;
}

if (verb === 'g') {
    const entityType = _.nth(args, 1);
    const entityName = _.nth(args, 2);
    const supportedEntityTypes = ['component', 'module', 'hook'];
    if (!supportedEntityTypes.includes(entityType)) {
        console.error('Unsupported entity type: ' + entityType);
        console.error('Supported: ' + supportedEntityTypes.join(', '));
        return;
    }
    if (!entityName) {
        console.error('Please provide entity name!');
        return;
    }
    if (entityType === 'hook') {
        const fileContent = templates.hookTemplates.hookTemplate(entityName);
        fs.writeFileSync(path.resolve(__dirname, '..', 'src', 'hooks', `${entityName}.ts`), fileContent, { encoding: "utf8" });
        console.log(`Hook ${entityName} created!`);
        return;
    }
    if (entityType === 'component') {

    }
}
