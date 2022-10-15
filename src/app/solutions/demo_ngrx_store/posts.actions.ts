import { createAction, props } from '@ngrx/store';
import {Post} from "./post.model";

// All application events
export const PostActionTypes = {
  LoadPosts : '[ Command ] :: LoadPosts',
  SelectPost : '[ Command ] :: SelectPost',
  PostsUpdated : '[ Event ] :: PostsUpdated',
  PostSelected : '[ Event ] :: PostSelected',
  SetPosts :  '[ Document ] :: SetPosts',
  SetSelectedPost : '[ Document ] :: SetSelectedPostId'
}

//*************
// COMMANDS
//*************
export const loadPosts = createAction(PostActionTypes.LoadPosts)

export const selectPost = createAction(
    PostActionTypes.SelectPost,
    props<{ postId: number }>()
);

//*************
// EVENTS
//*************
export const postsUpdated = createAction(PostActionTypes.PostsUpdated);
export const postsSelected = createAction(PostActionTypes.PostSelected);

//*************
// DOCUMENT
//*************
export const setPosts = createAction(
    PostActionTypes.SetPosts,
    props<{ posts: Array<Post> }>()
);

export const setSelectedPostId = createAction(
    PostActionTypes.SetSelectedPost,
    props<{ postId: number }>()
);



