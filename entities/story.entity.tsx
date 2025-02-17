import {BaseEntity} from './base.entity'; // BaseEntity'nin import edildiğini varsayıyorum
import {Candidate} from './candidate.entity';
import {SocialMedia} from './social.media.entity';
export class Story extends BaseEntity {
  image: string;
  content: string;
  candidate?: Candidate; // FK
  socialMedia?: SocialMedia; // FK

  constructor(
    id: string,
    image: string,
    content: string,
    candidate?: Candidate,
    socialMedia?: SocialMedia,
  ) {
    super(id);
    this.image = image;
    this.content = content;
    this.candidate = candidate ? Candidate.fromJSON(candidate) : undefined;
    this.socialMedia = socialMedia
      ? SocialMedia.fromJSON(socialMedia)
      : undefined;
  }
}
