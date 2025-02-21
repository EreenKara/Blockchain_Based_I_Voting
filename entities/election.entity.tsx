import {BaseEntity, BaseEntityOptions} from './base.entity';
import {ElectionStatus} from '@enums/election.status';
import {ElectionAccessType} from '@enums/election.access.type';
import {ElectionAddress} from './election.address.entity';
import {ElectionAccessUsers} from './election.access.users.entity';
import {ElectionsAdmins} from './elections.admins.entity';
import {ElectionsChoices} from './elections.choices.entity';
import {Vote} from './vote.entity';
import {SocialMedia} from './social.media.entity';
import {User} from './user.entity';

export interface ElectionOptions extends BaseEntityOptions {
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: ElectionStatus;
  accessType: ElectionAccessType;
  user?: User | null;
  address?: ElectionAddress | null;
  electionAccessUsers?: ElectionAccessUsers[] | null;
  electionsAdmins?: ElectionsAdmins[] | null;
  electionsChoices?: ElectionsChoices[] | null;
  vote?: Vote | null;
  socialMedia?: SocialMedia | null;
}

export class Election extends BaseEntity {
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: ElectionStatus;
  accessType: ElectionAccessType;
  user: User | null;
  address: ElectionAddress | null;
  electionAccessUsers: ElectionAccessUsers[] | null;
  electionsAdmins: ElectionsAdmins[] | null;
  electionsChoices: ElectionsChoices[] | null;
  vote: Vote | null;
  socialMedia: SocialMedia | null;

  constructor(options: ElectionOptions) {
    super({id: options.id});
    this.name = options.name;
    this.description = options.description;
    this.image = options.image;
    this.startDate = options.startDate;
    this.endDate = options.endDate;
    this.status = options.status;
    this.accessType = options.accessType;
    this.address = options.address
      ? ElectionAddress.fromJSON(options.address)
      : null;
    this.user = options.user ? User.fromJSON(options.user) : null;
    this.electionAccessUsers =
      options.electionAccessUsers?.map(user =>
        ElectionAccessUsers.fromJSON(user),
      ) || null;
    this.electionsAdmins =
      options.electionsAdmins?.map(admin => ElectionsAdmins.fromJSON(admin)) ||
      null;
    this.electionsChoices =
      options.electionsChoices?.map(choice =>
        ElectionsChoices.fromJSON(choice),
      ) || null;
    this.vote = options.vote ? Vote.fromJSON(options.vote) : null;
    this.socialMedia = options.socialMedia
      ? SocialMedia.fromJSON(options.socialMedia)
      : null;
  }
}
