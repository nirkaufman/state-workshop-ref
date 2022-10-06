import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-post-start',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="row">
          <div class="col-4">
              <button class="btn btn-primary my-4">create new post</button>

              <!-- Hide until create post is clicked -->
              <div class="card">
                  <div class="card-header d-flex justify-content-between">
                      <span>Featured</span>
                      <!-- Reflect the current post status -->
                      <span class="text-primary">status: </span>
                  </div>
                  <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <div class="d-flex justify-content-between">
                        <button class="btn btn-primary">publish</button>
                          <!-- Show only if UNDER_REVIEW -->
                          <div class="d-flex ">
                              <button class="btn btn-outline-danger btn-sm">decline</button>
                              <button class="btn btn-outline-success ms-2 btn-sm">approve</button>
                          </div>
                      </div>
                  </div>
              </div>
              
          </div>
      </div>
  `,
})
export class PostStartComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
