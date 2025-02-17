import {BaseEntity} from './base.entity';
import {Election} from './election.entity';
import {User} from './user.entity';

// belki ileride bu tablo farklı veriler tutar diye bu tablo var.
export class ElectionAccessUsers extends BaseEntity {
  user?: User; // FK
  election?: Election; // FK

  constructor(id: string, user?: User, election?: Election) {
    super(id);
    this.user = user ? User.fromJSON(user) : undefined;
    this.election = election ? Election.fromJSON(election) : undefined;
  }
}
