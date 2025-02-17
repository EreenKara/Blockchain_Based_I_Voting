import {BaseEntity} from './base.entity';
import {UserAddress} from './user.adress.entity';
import {ElectionsAdmins} from './elections.admins.entity';
import {ElectionAccessUsers} from './election.access.users.entity';
import {Vote} from './vote.entity';
import {Comment} from './comment.entity';
import {Like} from './like.entity';
export class User extends BaseEntity {
  username: string;
  name: string;
  surname: string;
  identityNumber: string;
  image: string;
  email: string;
  phoneNumber: string;
  password: string;
  balance: number;
  verificationCode: string;
  createdAt: string;
  updatedAt: string;
  address?: UserAddress;
  electionsAdmins?: ElectionsAdmins[];
  electionAccessUsers?: ElectionAccessUsers[];
  votes?: Vote[];
  comments?: Comment[];
  likes?: Like[];

  constructor(
    id: string,
    username: string,
    name: string,
    surname: string,
    identityNumber: string,
    image: string,
    email: string,
    phoneNumber: string,
    password: string,
    balance: number,
    verificationCode: string,
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString(),
    address?: UserAddress,
    electionsAdmins?: ElectionsAdmins[],
    electionAccessUsers?: ElectionAccessUsers[],
    votes?: Vote[],
    comments?: Comment[],
    likes?: Like[],
  ) {
    super(id);
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.identityNumber = identityNumber;
    this.image = image;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.balance = balance;
    this.address = address;
    this.verificationCode = verificationCode;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.electionsAdmins = electionsAdmins?.map(admin =>
      ElectionsAdmins.fromJSON(admin),
    );
    this.electionAccessUsers = electionAccessUsers?.map(user =>
      ElectionAccessUsers.fromJSON(user),
    );
    this.votes = votes?.map(vote => Vote.fromJSON(vote));
    this.comments = comments?.map(comment => Comment.fromJSON(comment));
    this.likes = likes?.map(like => Like.fromJSON(like));
  }
}

// dbo'larda buralara gelsin
