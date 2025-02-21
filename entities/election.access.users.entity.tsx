import {BaseEntity, BaseEntityOptions} from './base.entity';
import {Election} from './election.entity';
import {User} from './user.entity';

export interface ElectionAccessUsersOptions extends BaseEntityOptions {
  user?: User | null;
  election?: Election | null;
}

// belki ileride bu tablo farklı veriler tutar diye bu tablo var.
export class ElectionAccessUsers extends BaseEntity {
  user: User | null;
  election: Election | null;

  constructor(options: ElectionAccessUsersOptions) {
    super({id: options.id});
    this.user = options.user ? User.fromJSON(options.user) : null;
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
  }
}
