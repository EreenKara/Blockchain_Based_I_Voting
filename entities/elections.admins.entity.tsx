import {BaseEntity} from './base.entity';
import {Candidate} from './candidate.entity';
import {Election} from './election.entity';
import {User} from './user.entity';

export class ElectionsAdmins extends BaseEntity {
  election?: Election; // FK
  user?: User; // FK
  candidate?: Candidate; // FK

  constructor(
    id: string,
    election?: Election,
    user?: User,
    candidate?: Candidate,
  ) {
    super(id);
    this.election = election ? Election.fromJSON(election) : undefined;
    this.user = user ? User.fromJSON(user) : undefined;
    this.candidate = candidate ? Candidate.fromJSON(candidate) : undefined;
  }
}
