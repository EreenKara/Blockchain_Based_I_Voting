import {BaseEntity, BaseEntityOptions} from './base.entity';
import {UserAddress} from './user.adress.entity';
import {ElectionsAdmins} from './elections.admins.entity';
import {ElectionAccessUsers} from './election.access.users.entity';
import {Vote} from './vote.entity';
import {Comment} from './comment.entity';
import {Like} from './like.entity';

export interface UserOptions extends BaseEntityOptions {
  username: string;
  name: string;
  surname: string;
  identityNumber: string;
  email: string;
  phoneNumber: string;
  password: string;
  balance?: number;
  image?: string | null;
  address?: UserAddress | null;
  electionsAdmins?: ElectionsAdmins[] | null;
  electionAccessUsers?: ElectionAccessUsers[] | null;
  votes?: Vote[] | null;
  comments?: Comment[] | null;
  likes?: Like[] | null;
}

export class User extends BaseEntity {
  username: string;
  name: string;
  surname: string;
  identityNumber: string;
  email: string;
  phoneNumber: string;
  password: string;
  balance?: number;
  image?: string;
  address?: UserAddress | null;
  electionsAdmins?: ElectionsAdmins[] | null;
  electionAccessUsers?: ElectionAccessUsers[] | null;
  votes?: Vote[] | null;
  comments?: Comment[] | null;
  likes?: Like[] | null;

  constructor(options: UserOptions) {
    super({id: options.id});
    this.username = options.username;
    this.name = options.name;
    this.surname = options.surname;
    this.identityNumber = options.identityNumber;
    this.phoneNumber = options.phoneNumber;
    this.password = options.password;
    this.balance = options.balance;
    this.address = options.address;
    this.image = options.image ? options.image : '';
    this.email = options.email ? options.email : '';
    this.electionsAdmins = options.electionsAdmins?.map(admin =>
      ElectionsAdmins.fromJSON(admin),
    );
    this.electionAccessUsers = options.electionAccessUsers?.map(user =>
      ElectionAccessUsers.fromJSON(user),
    );
    this.votes = options.votes?.map(vote => Vote.fromJSON(vote));
    this.comments = options.comments?.map(comment => Comment.fromJSON(comment));
    this.likes = options.likes?.map(like => Like.fromJSON(like));
  }
}

// dbo'larda buralara gelsin
