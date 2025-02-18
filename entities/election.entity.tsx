import {BaseEntity} from './base.entity';
import {ElectionStatus} from '@enums/election.status';
import {ElectionAccessType} from '@enums/election.access.type';
import {ElectionAddress} from './election.address.entity';
import {ElectionAccessUsers} from './election.access.users.entity';
import {ElectionsAdmins} from './elections.admins.entity';
import {ElectionsOptions} from './elections.options.entity';
import {Vote} from './vote.entity';
import {SocialMedia} from './social.media.entity';
import {User} from './user.entity';
export class Election extends BaseEntity {
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: ElectionStatus;
  accessType: ElectionAccessType;
  user?: User; // FK, bir userId'i gösterir
  address?: ElectionAddress;
  electionAccessUsers?: ElectionAccessUsers[];
  electionsAdmins?: ElectionsAdmins[];
  electionsOptions?: ElectionsOptions[];
  vote?: Vote;
  socialMedia?: SocialMedia;
  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    startDate: string,
    endDate: string,
    status: ElectionStatus,
    accessType: ElectionAccessType,
    user?: User,
    address?: ElectionAddress,
    electionAccessUsers?: ElectionAccessUsers[],
    electionsAdmins?: ElectionsAdmins[],
    electionsOptions?: ElectionsOptions[],
    vote?: Vote,
    socialMedia?: SocialMedia,
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.image = image;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.accessType = accessType;
    this.address = address ? ElectionAddress.fromJSON(address) : undefined;
    this.user = user ? User.fromJSON(user) : undefined;
    this.electionAccessUsers = electionAccessUsers?.map(user =>
      ElectionAccessUsers.fromJSON(user),
    );
    this.electionsAdmins = electionsAdmins?.map(admin =>
      ElectionsAdmins.fromJSON(admin),
    );
    this.electionsOptions = electionsOptions?.map(option =>
      ElectionsOptions.fromJSON(option),
    );
    this.vote = vote ? Vote.fromJSON(vote) : undefined;
    this.socialMedia = socialMedia
      ? SocialMedia.fromJSON(socialMedia)
      : undefined;
  }
}
