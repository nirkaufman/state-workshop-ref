import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-list-start',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="card">
      <div class="card-body">
          <h5 class="card-title">Task List</h5>
          <input type="text" class="form-control my-2" placeholder="Add to this list...">
          <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex">
                  <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                          Default checkbox
                      </label>
                  </div>
              </li>
              <li class="list-group-item d-flex">
                  <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                          Default checkbox
                      </label>
                  </div>
              </li>
              <li class="list-group-item d-flex">
                  <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                          Default checkbox
                      </label>
                  </div>
              </li>
          </ul>

          <p class="card-text my-3"><small class="text-muted">5 items left</small></p>
      </div>
      </div>
  `,
  styles: []
})
export class ListStartComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
