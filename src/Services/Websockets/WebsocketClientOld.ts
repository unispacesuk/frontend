import { WebsocketBuilder } from 'websocket-ts';
import { useUser } from '../../Stores/UserStore';

export class WebsocketClientOld {
  private readonly channelName: string;
  private readonly url: string | undefined;
  private websocket: WebSocket | undefined;
  private readonly userId: number;

  private notificationEvent: CustomEvent | undefined = undefined;
  private roomMessageEvent: CustomEvent | undefined = undefined;
  private reconnectEvent: CustomEvent | undefined = undefined;

  constructor(channelName: string, url: string, userId: number) {
    this.channelName = channelName;
    this.url = url;
    this.userId = userId;

    // connect to the websocket
    this.connect().then(() => {
      this.onMessage();
      this.onClose();
      this.onError();
    });
  }

  private connect() {
    this.websocket = new WebSocket(this.url!);
    return new Promise((resolve, reject) => {
      this.websocket!.onopen = () => {
        this.websocket!.send(
          JSON.stringify({
            type: 'connection',
            user: this.userId,
          })
        );
        setTimeout(() => {
          return resolve(null);
        }, 200);
      };
    });
  }

  private onNotification(data: any) {
    this.notificationEvent = new CustomEvent('new-notification', { detail: data });
    document.dispatchEvent(this.notificationEvent);
  }

  private onRoomMessage(data: any) {
    this.roomMessageEvent = new CustomEvent('new-room-message', { detail: data });
    document.dispatchEvent(this.roomMessageEvent);
  }

  private onPing() {
    this.sendMessage(JSON.stringify({ type: 'pong', user: this.userId }));
  }

  private onMessage() {
    this.websocket!.onmessage = (serverMessage) => {
      const data = JSON.parse(serverMessage.data);

      switch (data.type) {
        case 'ping':
          this.onPing();
          break;
        case 'notification':
          this.onNotification(data);
          break;
        case 'room-message':
          this.onRoomMessage(data);
          break;
      }
    };
  }

  private onClose() {
    this.websocket!.onclose = () => {
      console.log('the websocket closed...');
      setTimeout(() => {
        // this.reconnectEvent = new CustomEvent('real-time-reconnect');
        // document.dispatchEvent(this.reconnectEvent);
        this.connect().then(() => {
          // useUser().connections[0].websocket = new WebSocket(this.url!);
        });
      }, 1000);
    };
  }

  private onError() {
    this.websocket!.onerror = () => {
      console.log('the websocket errored...');
    };
  }

  public sendMessage(data: any) {
    this.websocket!.send(data);
  }
}
