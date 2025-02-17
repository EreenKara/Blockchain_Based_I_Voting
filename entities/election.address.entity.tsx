import {BaseEntity} from './base.entity'; // BaseEntity'nin import edildiğini varsayıyorum
import {City} from './city.entity';
import {District} from './district.entity';
import {Neighborhood} from './neighbourdhood.entity';
import {Election} from './election.entity';
export class ElectionAddress extends BaseEntity {
  election?: Election; // FK
  city: City; // FK
  district: District; // FK
  neighborhood: Neighborhood; // FK

  constructor(
    id: string,
    city: City,
    district: District,
    neighborhood: Neighborhood,
    election?: Election,
  ) {
    super(id);
    this.city = City.fromJSON(city);
    this.district = District.fromJSON(district);
    this.neighborhood = Neighborhood.fromJSON(neighborhood);
    this.election = election ? Election.fromJSON(election) : undefined;
  }
}
