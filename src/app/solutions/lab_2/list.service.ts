import { Injectable } from '@angular/core';

export interface Subscriber<T> {
  update(state: T): void;
}

class Publisher<T> {
  private subscribers: Subscriber<T>[];

  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber: Subscriber<T>) {
    if (this.subscribers.includes(subscriber)) return;
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber<T>) {
    const index = this.subscribers.indexOf(subscriber);

    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  publish(state: any) {
    this.subscribers.forEach(subscriber => subscriber.update(state))
  }
}

export class Item {
  title: string;
  createdAt: string;

  constructor(title: string) {
    this.title = title;
    this.createdAt = new Date().toISOString();
  }
}

@Injectable({providedIn: 'root'})
export class ListService extends Publisher<Item[]>{
  private readonly items: Array<Item>;

  constructor() {
    super();
    this.items = [];
  }

  addItem(title: string) {
    this.items.push(new Item(title));
    this.publish(this.items);
  }
}
