import {BaseEntity} from './base.entity';
import {ElectionsAdmins} from './elections.admins.entity';
import {Vote} from './vote.entity';
import {Election} from './election.entity';
import {User} from './user.entity';
import {Story} from './story.entity';
export class Candidate extends BaseEntity {
  name: string;
  description: string;
  image: string;
  color: string;
  createdBy: number; // FK
  createdAt: string;
  updatedAt: string;
  electionsAdmins?: ElectionsAdmins[];
  election?: Election; // FK
  user?: User; // FK
  votes?: Vote[];
  stories?: Story[];
  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    color: string,
    createdBy: number,
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString(),
    electionsAdmins?: ElectionsAdmins[],
    election?: Election,
    user?: User,
    votes?: Vote[],
    stories?: Story[],
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.image = image;
    this.color = color;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.electionsAdmins = electionsAdmins?.map(admin =>
      ElectionsAdmins.fromJSON(admin),
    );
    this.election = election ? Election.fromJSON(election) : undefined;
    this.user = user ? User.fromJSON(user) : undefined;
    this.votes = votes?.map(vote => Vote.fromJSON(vote));
    this.stories = stories?.map(story => Story.fromJSON(story));
  }
}
