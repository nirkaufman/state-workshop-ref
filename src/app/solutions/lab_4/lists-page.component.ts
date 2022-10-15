import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListStartComponent} from "./list-start.component";
import {MasterListStartComponent} from "./master-list-start.component";

@Component({
  selector: 'app-list-page-start',
  standalone: true,
  imports: [CommonModule, ListStartComponent, MasterListStartComponent],
  template: `
      <div class="row">
          <div class="col-4 border-end">
            <app-master-list-start></app-master-list-start>
          </div>
          <div class="col-8">
              <div class="card-group">
                 <app-list-start></app-list-start>
                 <app-list-start></app-list-start>
                 <app-list-start></app-list-start>
              </div>
          </div>
      </div>
      
      <div class="alert alert-info mt-4 border-top" role="alert">
          A simple info alert—check it out!
      </div>
  `,
  styles: []
})
export class ListsPageStartComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
