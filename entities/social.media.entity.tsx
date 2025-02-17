import {BaseEntity} from './base.entity';
import {Election} from './election.entity';
import {Post} from './post.entity';
export class SocialMedia extends BaseEntity {
  election?: Election; // FK
  posts?: Post[];

  constructor(id: string, election?: Election, posts?: Post[]) {
    super(id);
    this.election = election ? Election.fromJSON(election) : undefined;
    this.posts = posts?.map(post => Post.fromJSON(post));
  }
}
