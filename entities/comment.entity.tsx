export default interface Comment {
  id: number;
  postId: number; // FK
  userId: number; // FK
  content: string;
}
