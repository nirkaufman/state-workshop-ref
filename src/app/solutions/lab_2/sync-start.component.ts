import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
      <nav class="navbar bg-primary">
          <div class="container-fluid">
              <span class="navbar-brand mb-0 h1 text-light">Navbar</span>
          </div>
      </nav>
  `
})
class NavbarComponent {
}


@Component({
  selector: 'app-list',
  standalone: true,
  template: `
      <div class="mt-3">
          <div class="col-4 d-flex">
              <input type="text" class="form-control me-3">
              <button class="btn btn-outline-primary">ADD</button>
          </div>
          <ul class="list-group mt-3">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
              <li class="list-group-item">A fourth item</li>
              <li class="list-group-item">And a fifth one</li>
          </ul>
      </div>
  `
})
class ListComponent {
}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
      <div class="card mt-3">
          <div class="card-body bg-light">
              Some footer information here
          </div>
      </div>
  `
})
class FooterComponent {
}


@Component({
  selector: 'app-sync-start',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ListComponent, FooterComponent],
  template: `
      <app-navbar></app-navbar>
      <app-list></app-list>
      <app-footer></app-footer>
  `,
})
export class SyncStartComponent {}
