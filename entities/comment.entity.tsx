import {BaseEntity} from './base.entity';
import {Like} from './like.entity';
import {Post} from './post.entity';
import {User} from './user.entity';

export interface CommentOptions {
  id: string;
  content: string;
  post?: Post | null;
  user?: User | null;
  likes?: Like[] | null;
}

export class Comment extends BaseEntity {
  post: Post | null;
  user: User | null;
  content: string;
  likes: Like[] | null;

  constructor(options: CommentOptions) {
    super(options.id);
    this.content = options.content;
    this.post = options.post ? Post.fromJSON(options.post) : null;
    this.user = options.user ? User.fromJSON(options.user) : null;
    this.likes = options.likes?.map(like => Like.fromJSON(like)) || null;
  }
}
