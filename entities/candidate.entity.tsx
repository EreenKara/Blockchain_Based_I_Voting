import {BaseEntity, BaseEntityOptions} from './base.entity';
import {ElectionsAdmins} from './elections.admins.entity';
import {Vote} from './vote.entity';
import {Election} from './election.entity';
import {User} from './user.entity';
import {Story} from './story.entity';

export interface CandidateOptions extends BaseEntityOptions {
  name: string;
  description: string;
  image: string;
  color: string;
  createdBy?: User | null;
  electionsAdmins?: ElectionsAdmins[] | null;
  election?: Election | null;
  user?: User | null;
  votes?: Vote[] | null;
  stories?: Story[] | null;
}

export class Candidate extends BaseEntity {
  name: string;
  description: string;
  image: string;
  color: string;
  createdBy: User | null;
  electionsAdmins: ElectionsAdmins[] | null;
  election: Election | null;
  user: User | null;
  votes: Vote[] | null;
  stories: Story[] | null;

  constructor(options: CandidateOptions) {
    super({id: options.id});
    this.name = options.name;
    this.description = options.description;
    this.image = options.image;
    this.color = options.color;
    this.createdBy = options.createdBy
      ? User.fromJSON(options.createdBy)
      : null;
    this.electionsAdmins =
      options.electionsAdmins?.map(admin => ElectionsAdmins.fromJSON(admin)) ||
      null;
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
    this.user = options.user ? User.fromJSON(options.user) : null;
    this.votes = options.votes?.map(vote => Vote.fromJSON(vote)) || null;
    this.stories = options.stories?.map(story => Story.fromJSON(story)) || null;
  }
}
