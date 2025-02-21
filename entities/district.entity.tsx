import {BaseEntity, BaseEntityOptions} from './base.entity';
import {City} from './city.entity';
import {Neighborhood} from './neighbourdhood.entity';

export interface DistrictOptions extends BaseEntityOptions {
  name: string;
  city?: City | null;
  neighborhoods?: Neighborhood[] | null;
}

export class District extends BaseEntity {
  city: City | null;
  neighborhoods: Neighborhood[] | null;
  name: string;

  constructor(options: DistrictOptions) {
    super({id: options.id});
    this.name = options.name;
    this.city = options.city ? City.fromJSON(options.city) : null;
    this.neighborhoods =
      options.neighborhoods?.map(neighborhood =>
        Neighborhood.fromJSON(neighborhood),
      ) || null;
  }
}
