import {BaseEntity} from './base.entity';
import {Candidate} from './candidate.entity';
import {SocialMedia} from './social.media.entity';
import {Comment} from './comment.entity';
import {Like} from './like.entity';
export class Post extends BaseEntity {
  content: string;
  image: string;
  socialMedia?: SocialMedia; // FK
  candidate?: Candidate; // FK
  comments?: Comment[];
  likes?: Like[];

  constructor(
    id: string,
    content: string,
    image: string,
    socialMedia?: SocialMedia,
    candidate?: Candidate,
    comments?: Comment[],
    likes?: Like[],
  ) {
    super(id);
    this.socialMedia = socialMedia
      ? SocialMedia.fromJSON(socialMedia)
      : undefined;
    this.candidate = candidate ? Candidate.fromJSON(candidate) : undefined;
    this.content = content;
    this.image = image;
    this.comments = comments?.map(comment => Comment.fromJSON(comment));
    this.likes = likes?.map(like => Like.fromJSON(like));
  }
}

// dbo'larda buralara gelsin
