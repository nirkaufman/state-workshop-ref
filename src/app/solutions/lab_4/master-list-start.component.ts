import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master-list-start',
  standalone: true,
  imports: [CommonModule],
  template: `
      <h5>Master List</h5>
      <input type="text" class="form-control my-3" placeholder="Add to all lists...">
      <ol class="list-group list-group-numbered">
          <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                  <div class="fw-bold">List Name</div>
                  <div>Remaining tasks: 5</div>
                  <div><i>Last update at: 10:30</i></div>
                  <button class="btn btn-sm btn-outline-danger me-2">clear list</button>
                  <button class="btn btn-sm btn-outline-secondary">clear completed</button>
              </div>
              <h4>
                  <span class="badge bg-warning rounded-pill">5</span>
              </h4>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-start active">
              <div class="ms-2 me-auto">
                  <div class="fw-bold">List Name</div>
                  <div>Remaining tasks: 5</div>
                  <div><i>Last update at: 10:30</i></div>
                  <button class="btn btn-sm btn-danger me-2">clear list</button>
                  <button class="btn btn-sm btn-secondary">clear completed</button>
              </div>
              <h4>
                  <span class="badge bg-warning rounded-pill">5</span>
              </h4>
          </li>
      </ol>
  `,
  styles: [
  ]
})
export class MasterListStartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
