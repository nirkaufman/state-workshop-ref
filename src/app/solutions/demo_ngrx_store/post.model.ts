export enum PostStatus {
  Draft = 'Draft',
  Published = 'Published',
}

export interface Post {
  id: number,
  title: string,
  content: string,
  status: PostStatus,
  createdAt: string,
  updatedAt: string
}
