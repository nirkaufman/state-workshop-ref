import {Component} from '@angular/core';
import {PostEndComponent} from "./solutions/lab_1/post-end.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostEndComponent, NgIf],
  template: `
     <div class="container">
        <h1>State Workshop Ref</h1>
         <button class="btn btn-primary my-4" (click)="startNewPost()">create new post</button>
        <app-post-end *ngIf="showPostUI"></app-post-end> 
    </div>
  `,

})
export class AppComponent {
  showPostUI = false;

  startNewPost() {
    this.showPostUI = true;
  }
}
