import {enableProdMode, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideStore} from "@ngrx/store";
import {postsReducer} from "./app/solutions/demo_ngrx_store/posts.reducer";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from '@ngrx/effects';
import {PostsEffects} from "./app/solutions/demo_ngrx_store/posts.effects";
import {HttpClientModule} from "@angular/common/http";


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({postsApp: postsReducer}),
    provideEffects([PostsEffects]),
    provideStoreDevtools(),
   importProvidersFrom(HttpClientModule)
  ],
})
  .catch(err => console.error(err));
