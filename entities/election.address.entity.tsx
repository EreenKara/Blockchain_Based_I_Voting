import {BaseEntity, BaseEntityOptions} from './base.entity';
import {City} from './city.entity';
import {District} from './district.entity';
import {Neighborhood} from './neighbourdhood.entity';
import {Election} from './election.entity';

export interface ElectionAddressOptions extends BaseEntityOptions {
  city: City;
  district: District;
  neighborhood: Neighborhood;
  election?: Election | null;
}

export class ElectionAddress extends BaseEntity {
  election: Election | null;
  city: City; // FK
  district: District; // FK
  neighborhood: Neighborhood; // FK

  constructor(options: ElectionAddressOptions) {
    super({id: options.id});
    this.city = City.fromJSON(options.city);
    this.district = District.fromJSON(options.district);
    this.neighborhood = Neighborhood.fromJSON(options.neighborhood);
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
  }
}
