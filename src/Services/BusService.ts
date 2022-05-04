import { from, Subject } from 'rxjs';

interface EventListener {
  name: string;
  // listener: (...data: any) => any;
  listeners: [(...data: any) => any];
}

export class BusService {
  eventListeners: EventListener[];
  subject: Subject<any>;
  currentEvents: any;

  constructor() {
    this.eventListeners = [];
    this.subject = new Subject<any>();
    this.currentEvents = from(this.subject);

    this.currentEvents.subscribe(({ name, data }: any) => {
      const event = this.eventListeners.filter((l) => l.name === name);
      if (event.length === 1) {
        event.forEach((l) => {
          l.listeners.forEach((fn) => {
            if (fn !== undefined) {
              fn.call(name, ...data);
            }
          });
        });
      }

      // if for any reason we get too many events with the same name lets just crash!
      if (event.length > 1) {
        throw new Error('Too many events with the same name.');
      }
    });
  }

  // subscribe or listen to an event
  listen(name: string, listener: (...args: any) => any) {
    const currentListeners = this.eventListeners.filter((l) => l.name === name);

    if (currentListeners.length === 0) {
      this.eventListeners.push({
        name: name,
        listeners: [listener],
      } as EventListener);

      return;
    }

    this.eventListeners.map((l) => {
      if (l.name === name) {
        l.listeners.push(listener);
      }
    });
  }

  // unsubscribe or stop listening to events
  forget(name: string) {
    this.eventListeners = this.eventListeners.filter((l) => l.name !== name);
  }

  // emit or send an event
  // the value could be just the name or an object containing data
  emit(name: string, ...data: any) {
    this.subject.next({
      name,
      data,
    });
  }
}
