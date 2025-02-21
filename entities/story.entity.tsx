import {BaseEntity, BaseEntityOptions} from './base.entity'; // BaseEntity'nin import edildiğini varsayıyorum
import {Candidate} from './candidate.entity';
import {SocialMedia} from './social.media.entity';

export interface StoryOptions extends BaseEntityOptions {
  image: string;
  content: string;
  candidate?: Candidate | null;
  socialMedia?: SocialMedia | null;
}

export class Story extends BaseEntity {
  image: string;
  content: string;
  candidate?: Candidate | null; // FK
  socialMedia?: SocialMedia | null; // FK

  constructor(options: StoryOptions) {
    super({id: options.id});
    this.image = options.image;
    this.content = options.content;
    this.candidate = options.candidate
      ? Candidate.fromJSON(options.candidate)
      : null;
    this.socialMedia = options.socialMedia
      ? SocialMedia.fromJSON(options.socialMedia)
      : null;
  }
}
