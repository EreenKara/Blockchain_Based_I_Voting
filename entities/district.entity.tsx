import {BaseEntity} from './base.entity';
import {City} from './city.entity';
import {Neighborhood} from './neighbourdhood.entity';
export class District extends BaseEntity {
  city?: City;
  neighborhoods?: Neighborhood[]; // FK
  name: string;

  constructor(
    id: string,
    name: string,
    city?: City,
    neighborhoods?: Neighborhood[],
  ) {
    super(id);
    this.name = name;
    this.city = city ? City.fromJSON(city) : undefined;
    this.neighborhoods = neighborhoods?.map(neighborhood =>
      Neighborhood.fromJSON(neighborhood),
    );
  }
}
