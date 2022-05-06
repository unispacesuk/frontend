import { ConstantBackoff, Websocket, WebsocketBuilder } from 'websocket-ts';
import { useUser } from '../../Stores/UserStore';

export class WebsocketClient {
  constructor() {
    this.connectWebsocket();
  }

  public connectWebsocket() {
    useUser().connection.websocket = new WebsocketBuilder('wss://ws.unispaces.uk/real-time')
      // useUser().connection.websocket = new WebsocketBuilder('ws://localhost:3002/real-time')
      .onOpen((ws, ev) => {
        ws.send(
          JSON.stringify({
            type: 'connection',
            user: useUser().user.id,
          })
        );
      })
      .onMessage((ws, ev) => {
        const data = JSON.parse(ev.data);
        switch (data.type) {
          case 'ping':
            this.onPing(ws);
            break;
          case 'notification':
            this.onNotification(data);
            break;
          case 'room-message':
            this.onRoomMessage(data);
            break;
          case 'notification-bell':
            this.onNotificationBell();
            break;
        }
      })
      .withBackoff(new ConstantBackoff(1000))
      .onClose((ws, ev) => {
        console.log('closed?.....');
      })
      .onError((ws, ev) => {
        console.log('some error...');
      })
      .build();
  }

  private onNotification(data: any) {
    const notificationEvent = new CustomEvent('new-notification', { detail: data });
    document.dispatchEvent(notificationEvent);
  }

  private onNotificationBell() {
    const notificationEvent = new CustomEvent('notification-bell');
    document.dispatchEvent(notificationEvent);
  }

  private onRoomMessage(data: any) {
    Object.assign(data, { ...data, userId: useUser().user.id });
    const roomMessageEvent = new CustomEvent('new-room-message', {
      detail: data,
    });
    document.dispatchEvent(roomMessageEvent);
  }

  private onPing(ws: Websocket) {
    ws.send(JSON.stringify({ type: 'pong', user: useUser().user.id }));
  }
}
