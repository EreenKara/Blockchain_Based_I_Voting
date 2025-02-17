import {BaseEntity} from './base.entity';
import {LikeType} from '../enums/like.type';
import {Post} from './post.entity';
import {Comment} from './comment.entity';
import {User} from './user.entity';
export class Like extends BaseEntity {
  post?: Post; // FK
  comment?: Comment; // FK
  user?: User; // FK
  type: LikeType;

  constructor(
    id: string,
    type: LikeType,
    post?: Post,
    comment?: Comment,
    user?: User,
  ) {
    super(id);
    this.post = post ? Post.fromJSON(post) : undefined;
    this.comment = comment ? Comment.fromJSON(comment) : undefined;
    this.user = user ? User.fromJSON(user) : undefined;
    this.type = type;
  }
}
