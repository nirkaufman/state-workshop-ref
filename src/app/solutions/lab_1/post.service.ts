import { Injectable } from '@angular/core';

// It's almost always a good idea instead of hard-coded strings
export enum PostStates {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  DECLINED = 'APPROVED',
  PUBLISHED = 'PUBLISHED'
}

// Extract the method that effected by the state to abstract class
abstract class PostState {
  protected postService: PostService;
  protected postState: PostStates;

  setContext(context: PostService) {
    this.postService = context;
    this.init();
  }

  getState() {
    return this.postState;
  }

  abstract init(): void;
  abstract publish(): void;
  abstract approve(): void;
  abstract decline(): void;
}


// Define the  states of the post
class Draft extends PostState {
  init(): void {
    console.log('New draft for a post created');

    this.postState = PostStates.DRAFT;
    this.postService.editable = true;
    this.postService.publishable = false;
  }

  publish(): void {
    this.postService.setState(new InReview());
  }

  approve(): void {}
  decline(): void {}
}

class InReview extends PostState {
  init(): void {
    console.log('Post is in review');

    this.postState = PostStates.IN_REVIEW;
    this.postService.editable = false;
    this.postService.publishable = false;
  }

  publish(): void {}

  approve(): void {
    this.postService.setState(new Approved())
  }

  decline(): void {
    this.postService.setState(new Declined())
  }
}

class Declined extends PostState {
  init(): void {
    console.log('The post has been declined!');

    this.postState = PostStates.DECLINED;
    this.postService.editable = true;
    this.postService.publishable = false;
  }

  publish(): void {
    this.postService.setState(new InReview());
  }

  approve(): void {}
  decline(): void {}
}

class Approved extends PostState {
  init(): void {
    console.log('The post has been approved!');

    this.postState = PostStates.APPROVED;
    this.postService.editable = false;
    this.postService.publishable = true;
  }

  publish(): void {
    this.postService.setState(new Published());
  }

  approve(): void {}
  decline(): void {}
}

class Published extends PostState {
  init(): void {
    console.log('The post has been published');

    this.postState = PostStates.PUBLISHED;
    this.postService.editable = false;
    this.postService.publishable = false;
  }

  publish(): void {}
  approve(): void {}
  decline(): void {}
}


// Public service
@Injectable({providedIn: 'root'})
export class PostService {
  private postState: PostState;

  editable: boolean;
  publishable: boolean

  constructor() {
    console.log('Fresh instance of PostService has been created!');

    this.setState(new Draft());
  }

  setState(postState: PostState) {
    this.postState = postState;
    this.postState.setContext(this);
  }

  publish() {
    this.postState.publish();
  }

  approve() {
    this.postState.approve();
  }

  declined() {
    this.postState.decline();
  }

  getState() {
    return this.postState.getState();
  }
}
