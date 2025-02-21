import {BaseEntity} from './base.entity';
import {Candidate} from './candidate.entity';
import {Election} from './election.entity';
import {User} from './user.entity';

export interface ElectionsAdminsOptions {
  id: string;
  election?: Election | null;
  user?: User | null;
  candidate?: Candidate | null;
}

export class ElectionsAdmins extends BaseEntity {
  election: Election | null;
  user: User | null;
  candidate: Candidate | null;

  constructor(options: ElectionsAdminsOptions) {
    super(options.id);
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
    this.user = options.user ? User.fromJSON(options.user) : null;
    this.candidate = options.candidate
      ? Candidate.fromJSON(options.candidate)
      : null;
  }
}
