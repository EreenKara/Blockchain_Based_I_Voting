import {BaseEntity} from './base.entity';
import {City} from './city.entity';
import {District} from './district.entity';
import {Neighborhood} from './neighbourdhood.entity';
import {User} from './user.entity';
export class UserAddress extends BaseEntity {
  user?: User; // FK
  city: City; // FK
  district: District; // FK
  neighborhood: Neighborhood; // FK
  buildingNumber: string;

  constructor(
    id: string,
    buildingNumber: string,
    city: City,
    district: District,
    neighborhood: Neighborhood,
    user?: User,
  ) {
    super(id);
    this.buildingNumber = buildingNumber;
    this.city = City.fromJSON(city);
    this.district = District.fromJSON(district);
    this.neighborhood = Neighborhood.fromJSON(neighborhood);
    this.user = user ? User.fromJSON(user) : undefined;
  }
}
