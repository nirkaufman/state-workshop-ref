import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-crud-start',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="row">
          <div class="col-7 border-end">
              <table class="table table-hover">
                  <thead>
                  <tr>
                      <th scope="col">id</th>
                      <th scope="col">title</th>
                      <th scope="col">created</th>
                      <th scope="col">updated</th>
                      <th scope="col">status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th scope="row">1</th>
                      <td>post number 1 title</td>
                      <td>22/10/23 10:30</td>
                      <td>22/10/23 11:30</td>
                      <td>draft</td>
                  </tr>
                  <tr>
                      <th scope="row">1</th>
                      <td>post number 1 title</td>
                      <td>22/10/23 10:30</td>
                      <td>22/10/23 11:30</td>
                      <td>draft</td>
                  </tr>
                  <tr>
                      <th scope="row">1</th>
                      <td>post number 1 title</td>
                      <td>22/10/23 10:30</td>
                      <td>22/10/23 11:30</td>
                      <td>draft</td>
                  </tr>
                  </tbody>
              </table>
          </div>
          <div class="col-5">
              <form>
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Title Of The Post</label>
                      <input type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">contect</label>
                      <textarea class="form-control"></textarea>
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">tags</label>
                      <input type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Status</label>
                      <select class="form-select">
                          <option value="1">Draft</option>
                          <option value="2">Published</option>
                      </select>
                  </div>
                  
                  <button type="button" class="btn btn-lg btn-outline-primary">Done</button>
              </form>
          </div>
      </div>
  `,
  styles: []
})
export class CrudStartComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
