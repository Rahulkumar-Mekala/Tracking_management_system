import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class LiveTrackingGateway {
  @WebSocketServer()
  server: Server;

  sendTrackingData(trackingData: any) {
    this.server.emit('busLocationUpdate', trackingData);
  }
}
