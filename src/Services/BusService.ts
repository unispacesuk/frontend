import { from, Subject } from 'rxjs';

/**
 * TODO: Refactor this class here 🤔
 */

export class BusService {
  listeners: {};
  eventsSubject: Subject<any>;
  events: any;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Subject<any>();
    this.events = from(this.eventsSubject);

    this.events.subscribe(
      ({name, args}: any) => {
        // @ts-ignore
        if (this.listeners[name]) {
          // @ts-ignore
          for (let listener of this.listeners[name]) {
            const myThis = listener.boundContext;
            if(listener.boundContext) {
              listener.call(myThis, ...args);
            } else {
              listener(...args);
            }

          }
        }
      });
  }

  // This method will subscribe to events
  subscribe(name: string, listener: any, context?: any) {
    // @ts-ignore
    if (!this.listeners[name]) {
      // @ts-ignore
      this.listeners[name] = [];
    }

    // @ts-ignore
    this.listeners[name].push(listener);
  }

  // this method will unsubscribe to events
  unsubscribe(name: string, listener: any) {
    // @ts-ignore
    const l = this.listeners[name];
    if (this.listeners) {
      const index = l.indexOf(listener);
      l.splice(index, 1);
    }
  }

  // this method is used to run events
  publish(name: string, ...args: any[]) {
    this.eventsSubject.next({
      name,
      args,
    });
  }
}
