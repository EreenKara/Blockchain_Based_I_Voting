import {BaseEntity, BaseEntityOptions} from './base.entity';
import {City} from './city.entity';
import {District} from './district.entity';
import {Neighborhood} from './neighbourdhood.entity';
import {User} from './user.entity';

export interface UserAddressOptions extends BaseEntityOptions {
  buildingNumber: string;
  city: City;
  district: District;
  neighborhood: Neighborhood;
  user?: User | null;
}

export class UserAddress extends BaseEntity {
  user?: User | null; // FK
  city: City; // FK
  district: District; // FK
  neighborhood: Neighborhood; // FK
  buildingNumber: string;

  constructor(options: UserAddressOptions) {
    super({id: options.id});
    this.buildingNumber = options.buildingNumber;
    this.city = City.fromJSON(options.city);
    this.district = District.fromJSON(options.district);
    this.neighborhood = Neighborhood.fromJSON(options.neighborhood);
    this.user = options.user ? User.fromJSON(options.user) : null;
  }
}
