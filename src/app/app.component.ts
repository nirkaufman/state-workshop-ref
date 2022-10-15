import {Component} from '@angular/core';
import {PostsComponent} from "./solutions/demo_ngrx_store/posts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostsComponent],
  template: `
      <div class="container">
          <h1>State Workshop Ref</h1>
          <app-posts></app-posts>
      </div>
  `,

})
export class AppComponent {
}
