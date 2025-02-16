export enum LikeType {
  Like = 'like',
  Dislike = 'dislike',
}

export default interface Like {
  id: number;
  postId: number; // FK
  commentId: number; // FK
  userId: number; // FK
  type: LikeType;
}
