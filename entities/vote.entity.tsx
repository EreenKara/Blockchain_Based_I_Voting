import {BaseEntity} from './base.entity';
import {Candidate} from './candidate.entity';
import {Election} from './election.entity';
import {User} from './user.entity';
export class Vote extends BaseEntity {
  createdAt: string;
  updatedAt: string;
  election?: Election; // FK
  candidate?: Candidate; // FK
  user?: User; // FK

  constructor(
    id: string,
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString(),
    election?: Election,
    candidate?: Candidate,
    user?: User,
  ) {
    super(id);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.election = election ? Election.fromJSON(election) : undefined;
    this.candidate = candidate ? Candidate.fromJSON(candidate) : undefined;
    this.user = user ? User.fromJSON(user) : undefined;
  }
}
