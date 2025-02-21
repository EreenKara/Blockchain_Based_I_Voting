import {BaseEntity} from './base.entity';
import {Election} from './election.entity';
import {Post} from './post.entity';

export interface SocialMediaOptions {
  id: string;
  election?: Election | null;
  posts?: Post[] | null;
}

export class SocialMedia extends BaseEntity {
  election?: Election | null; // FK
  posts?: Post[] | null;

  constructor(options: SocialMediaOptions) {
    super(options.id);
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
    this.posts = options.posts?.map(post => Post.fromJSON(post)) || null;
  }
}
