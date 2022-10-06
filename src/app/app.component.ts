import {Component} from '@angular/core';
import {SyncEndComponent} from "./solutions/lab_2/sync-end.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SyncEndComponent],
  template: `
     <div class="container">
        <h1>State Workshop Ref</h1>
        <app-sync-end></app-sync-end> 
    </div>
  `,

})
export class AppComponent {}
