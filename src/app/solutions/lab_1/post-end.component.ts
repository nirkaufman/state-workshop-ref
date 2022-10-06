import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostService, PostStates} from "./post.service";

@Component({
  selector: 'app-post-end',
  standalone: true,
  imports: [CommonModule],
  providers: [PostService],
  template: `
      <div class="row">
          <div class="col-4">
              <!-- Hide until create post is clicked -->
              <div class="card">
                  <div class="card-header d-flex justify-content-between">
                      <span>Featured</span>
                      <!-- Reflect the current post status -->
                      <span class="text-primary">status: {{ postState }}</span>
                  </div>
                  <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <div class="d-flex justify-content-between">
                          <button [disabled]="isSubmitDisabled" class="btn btn-primary" (click)="handlePublish()">publish</button>
                          <!-- Show only if UNDER_REVIEW -->
                          <div class="d-flex" *ngIf="showReviewButtons">
                              <button (click)="onDeclined()" class="btn btn-outline-danger btn-sm">decline</button>
                              <button (click)="onApproved()" class="btn btn-outline-success ms-2 btn-sm">approve</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `,
})
export class PostEndComponent {
  private postService = inject(PostService);

  get isSubmitDisabled () {
    const currentState = this.postService.getState()
    return currentState === PostStates.IN_REVIEW || currentState === PostStates.PUBLISHED;
  }

  get showReviewButtons() {
    const currentState = this.postService.getState()
    return currentState === PostStates.IN_REVIEW;
  }

  get postState() {
    return this.postService.getState();
  }

  handlePublish() {
    this.postService.publish();
  }

  onApproved() {
    this.postService.approve();
  }

  onDeclined() {
    this.postService.declined();
  }


}
