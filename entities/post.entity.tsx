import {BaseEntity} from './base.entity';
import {Candidate} from './candidate.entity';
import {SocialMedia} from './social.media.entity';
import {Comment} from './comment.entity';
import {Like} from './like.entity';

export interface PostOptions {
  id: string;
  content: string;
  image: string;
  socialMedia?: SocialMedia | null;
  candidate?: Candidate | null;
  comments?: Comment[] | null;
  likes?: Like[] | null;
}

export class Post extends BaseEntity {
  content: string;
  image: string;
  socialMedia?: SocialMedia | null; // FK
  candidate?: Candidate | null; // FK
  comments?: Comment[] | null;
  likes?: Like[] | null;

  constructor(options: PostOptions) {
    super(options.id);
    this.socialMedia = options.socialMedia
      ? SocialMedia.fromJSON(options.socialMedia)
      : null;
    this.candidate = options.candidate
      ? Candidate.fromJSON(options.candidate)
      : null;
    this.content = options.content;
    this.image = options.image;
    this.comments =
      options.comments?.map(comment => Comment.fromJSON(comment)) || null;
    this.likes = options.likes?.map(like => Like.fromJSON(like)) || null;
  }
}

// dbo'larda buralara gelsin
