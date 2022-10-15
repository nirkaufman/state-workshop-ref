import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostsState} from "./posts.reducer";

export const selectPostApp = createFeatureSelector<PostsState>('postsApp');

export const selectPosts = createSelector(
    selectPostApp,
    (postsApp) => postsApp.posts
);

export const selectActivePostId = createSelector(
    selectPostApp,
    (postsApp) => postsApp.selectedPostId
)

export const selectActivePost = createSelector(
    selectPosts,
    selectActivePostId,
    (posts, selectedPostId ) => {
      if(selectedPostId) {
        return posts.filter( (post: any) => post.id === selectedPostId )[0]
      } else {
        return null;
      }
    }
);
