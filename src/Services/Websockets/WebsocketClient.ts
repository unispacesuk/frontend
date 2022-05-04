export class WebsocketClient {
  private readonly channelName: string;
  private readonly url: string | undefined;
  private websocket: WebSocket | undefined;
  private readonly userId: number;

  private notificationEvent: CustomEvent | undefined = undefined;
  private roomMessageEvent: CustomEvent | undefined = undefined;

  constructor(channelName: string, url: string, userId: number) {
    this.channelName = channelName;
    this.url = url;
    this.userId = userId;

    // connect to the websocket
    this.connect();
    this.onMessage();
    // start a heartbeat function to test the websocket connection
    // this.heartBeat();
  }

  private connect() {
    this.websocket = new WebSocket(this.url!);
    this.websocket!.onopen = () => {
      this.websocket!.send(
        JSON.stringify({
          type: 'connection',
          user: this.userId,
        })
      );
    };
  }

  private onNotification(data: any) {
    this.notificationEvent = new CustomEvent('new-notification', { detail: data });
    document.dispatchEvent(this.notificationEvent);
  }

  private onRoomMessage(data: any) {
    this.roomMessageEvent = new CustomEvent('new-room-message', { detail: data });
    document.dispatchEvent(this.roomMessageEvent);
  }

  private onPing(data: any) {
    this.sendMessage(JSON.stringify({ type: 'pong', user: this.userId }));
  }

  private onMessage() {
    this.websocket!.onmessage = (serverMessage) => {
      const data = JSON.parse(serverMessage.data);

      switch (data.type) {
        case 'ping':
          this.onPing(data);
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

  public sendMessage(data: any) {
    this.websocket!.send(data);
  }
}
