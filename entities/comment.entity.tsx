import {BaseEntity} from './base.entity';
import {Like} from './like.entity';
import {Post} from './post.entity';
import {User} from './user.entity';
export class Comment extends BaseEntity {
  post?: Post; // FK
  user?: User; // FK
  content: string;
  likes?: Like[];

  constructor(
    id: string,
    content: string,
    post?: Post,
    user?: User,
    likes?: Like[],
  ) {
    super(id);
    this.content = content;
    this.post = post ? Post.fromJSON(post) : undefined;
    this.user = user ? User.fromJSON(user) : undefined;
    this.likes = likes?.map(like => Like.fromJSON(like));
  }
}
