import {BaseEntity, BaseEntityOptions} from './base.entity';
import {LikeType} from '../enums/like.type';
import {Post} from './post.entity';
import {Comment} from './comment.entity';
import {User} from './user.entity';

export interface LikeOptions extends BaseEntityOptions {
  type: LikeType;
  post?: Post | null;
  comment?: Comment | null;
  user?: User | null;
}

export class Like extends BaseEntity {
  post: Post | null; // FK
  comment: Comment | null; // FK
  user: User | null; // FK
  type: LikeType;

  constructor(options: LikeOptions) {
    super({id: options.id});
    this.post = options.post ? Post.fromJSON(options.post) : null;
    this.comment = options.comment ? Comment.fromJSON(options.comment) : null;
    this.user = options.user ? User.fromJSON(options.user) : null;
    this.type = options.type;
  }
}
