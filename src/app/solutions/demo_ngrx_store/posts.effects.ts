import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as PostActions from './posts.actions';
import {mergeMap, map, catchError, EMPTY, flatMap, tap} from "rxjs";
import {PostActionTypes, setPosts} from "./posts.actions";
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {PostApiService} from "./post.api.service";


@Injectable()
export class PostsEffects {

  constructor(private actions$: Actions,
              private postApiService: PostApiService
              // private httpClient: HttpClient
  ) {
  }

  // todo: First Version - Simple decider
  // loadPosts$ = createEffect(() => (
  //     this.actions$.pipe(
  //         ofType(PostActionTypes.LoadPosts),
  //         mergeMap(() => this.httpClient.get('http://localhost:3000/posts')
  //             .pipe(
  //                 // we can decide which action to return based on context, or metadata
  //                 map( (posts:any) => (PostActions.setPosts({posts}))),
  //                 catchError(() => EMPTY)
  //             ))
  //     )
  // ));

  // todo: Second Version - Implement splitter
  // loadPosts$ = createEffect(() => (
  //     this.actions$.pipe(
  //         // Decider: Filter by Action Type
  //         ofType(PostActionTypes.LoadPosts),
  //         mergeMap(() => this.httpClient.get('http://localhost:3000/posts')
  //             .pipe(
  //                 // Splitter: fire two action one after the other
  //                 mergeMap( (posts: any) => [
  //                   PostActions.setPosts({posts}),
  //                   PostActions.postsUpdated()
  //                 ]),
  //                 catchError(() => EMPTY)
  //             ),
  //         )
  //     )
  // ));

  // todo: Third Version - external API service
  loadPosts$ = createEffect(() => (
      this.actions$.pipe(
          // Decider: Filter by Action Type
          ofType(PostActionTypes.LoadPosts),
          // Decider: map to other action by content or context
          mergeMap(() => this.postApiService.fetchAllPosts()
              .pipe(
                  // Splitter: fire two action one after the other
                  mergeMap( (posts: any) => [
                    PostActions.setPosts({posts}),
                    PostActions.postsUpdated()
                  ]),
                  catchError(() => EMPTY)
              ),
          )
      )
  ));

  eventsLogger$ = createEffect(() => (
      this.actions$.pipe(
        ofType(PostActionTypes.PostsUpdated),
        tap( (action) => console.log('action logged:', action))
      )
  ), {dispatch: false})

  postSelection$ = createEffect(() => (
      this.actions$.pipe(
        ofType(PostActionTypes.SelectPost),
        // @ts-ignore
        map( ({ postId }) => {
          return PostActions.setSelectedPostId({postId})
        } )
      )
  ))

}
