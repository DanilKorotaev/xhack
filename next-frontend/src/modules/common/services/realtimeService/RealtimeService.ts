import {io, Socket} from "socket.io-client";

export class RealtimeService {
  private socket: Socket;

  constructor() {
    this.socket = io(process.env.NEXT_PUBLIC_IO_URL);
  }

  subscribeToEvent<EVENT_DATA>(event: string, subscriber: (data: EVENT_DATA) => void) {
    this.socket.on(event, subscriber);
  }

  authorize() {

  }

  unAuthorize() {

  }
}
