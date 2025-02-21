import {BaseEntity} from './base.entity';
import {Candidate} from './candidate.entity';
import {Election} from './election.entity';
import {User} from './user.entity';

export interface VoteOptions {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  election?: Election | null;
  candidate?: Candidate | null;
  user?: User | null;
}

export class Vote extends BaseEntity {
  election?: Election | null; // FK
  candidate?: Candidate | null; // FK
  user?: User | null; // FK

  constructor(options: VoteOptions) {
    super(options.id);
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
    this.candidate = options.candidate
      ? Candidate.fromJSON(options.candidate)
      : null;
    this.user = options.user ? User.fromJSON(options.user) : null;
  }
}
