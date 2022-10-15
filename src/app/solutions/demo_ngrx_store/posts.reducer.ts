import {Post} from "./post.model";
import {createReducer, on} from "@ngrx/store";
import * as PostsActions from './posts.actions';

// State shape
export interface PostsState {
    posts: Array<Post>,
    selectedPostId: number | null
}

export const initialState: PostsState = {
    posts: [],
    selectedPostId: null
}

// how to build the state
export const postsReducer = createReducer(
    initialState,
    on(PostsActions.setPosts, (state: PostsState, {posts}) => ({posts, selectedPostId: state.selectedPostId})),
    on(PostsActions.setSelectedPostId, (state: PostsState, {postId}) => ({posts: state.posts, selectedPostId: postId})),
);

