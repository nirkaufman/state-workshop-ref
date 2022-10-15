import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {selectActivePost, selectPosts} from "./posts.selectors";
import {Observable} from "rxjs";
import {Post} from "./post.model";
import * as PostActions from "./posts.actions";

@Component({
  selector: 'app-posts',
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
                  <tr *ngFor="let post of (posts$ | async)" (click)="selectPost(post.id)">
                      <th scope="row">{{ post.id }}</th>
                      <td>{{ post.title }}</td>
                      <td>22/10/23 10:30</td>
                      <td>22/10/23 11:30</td>
                      <td>draft</td>
                  </tr>
                  </tbody>
              </table>
          </div>
          <div class="col-5">
              <form *ngIf="(selectedPost$ | async) as post">
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Post title</label>
                      <input type="text" class="form-control" [value]="post.title">
                  </div>
                  <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">content</label>
                      <textarea class="form-control">{{ post.content }}</textarea>
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
export class PostsComponent implements OnInit {
  private readonly store = inject(Store);

  posts$: Observable<Post[]> = this.store.select(selectPosts);
  selectedPost$: Observable<Post | null> = this.store.select(selectActivePost);

  ngOnInit(): void {
    this.store.dispatch(PostActions.loadPosts())
  }

  selectPost(postId: number) {
    this.store.dispatch(PostActions.selectPost({ postId }));
  }
}
