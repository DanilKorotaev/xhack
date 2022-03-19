export enum IoOutcomingEvents {
  Test = 'Test',
  NewMessage = 'NewMessage',
  ReadChat = 'ReadChat',
  ChatRemoved = "ChatRemoved",
  ChatLeaved = "ChatLeaved"
}

export enum IoIncomingEvents {
  Authorize = 'Authorize',
  SendMessage = 'SendMessage',
  DeleteMessage = 'DeleteMessage',
  ReadMessage = 'ReadMessage'
}
