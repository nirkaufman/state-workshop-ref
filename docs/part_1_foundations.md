# Part I :: String Foundations

- discuss what is state
- you can't be in two states in the same time
- the foundation: related design patterns


## LAB 1 Solution

__APP.COMPONENT.TS__
```typescript
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
```

## LAB 2 Solution
