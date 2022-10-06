import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {Item, ListService, Subscriber} from "./list.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
      <nav class="navbar bg-primary">
          <div class="container-fluid">
              <span class="navbar-brand mb-0 h1 text-light">
                  Last Item Added at:  {{ lastAddedAt }}
              </span>
          </div>
      </nav>
  `
})
class NavbarComponent implements OnInit, Subscriber<Item[]>{
  private listService = inject(ListService);
  lastAddedAt: string;

  ngOnInit(): void {
    this.listService.subscribe(this);
  }

  update(items: Item[]): void {
    this.lastAddedAt = items[items.length - 1]?.createdAt || '';
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgForOf],
  template: `
      <div class="mt-3">
          <div class="col-4 d-flex">
              <input #titleInput type="text" class="form-control me-3">
              <button (click)="addItem(titleInput.value)" class="btn btn-outline-primary">ADD</button>
          </div>
          <ul class="list-group mt-3">
              <li *ngFor="let item of items" class="list-group-item">{{item.title}}</li>
          </ul>
      </div>
  `
})
class ListComponent implements OnInit, Subscriber<Item[]> {
  private listService = inject(ListService);
  items: Item[];


  ngOnInit(): void {
    this.listService.subscribe(this);
  }

  update(items: Item[]): void {
    this.items = items;
  }

  addItem(title: string) {
    this.listService.addItem(title);
  }
}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
      <div class="card mt-3">
          <div class="card-body bg-light">
              Items count: {{ itemCount }}
          </div>
      </div>
  `
})
class FooterComponent implements OnInit, Subscriber<Item[]>{
  private listService = inject(ListService);
  itemCount: number;

  ngOnInit(): void {
    this.listService.subscribe(this);
  }

  update(items: Item[]): void {
    this.itemCount = items.length;
  }
}

@Component({
  selector: 'app-sync-end',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ListComponent, FooterComponent],
  providers: [ListService],
  template: `
      <app-navbar></app-navbar>
      <app-list></app-list>
      <app-footer></app-footer>
  `,
})
export class SyncEndComponent {}
