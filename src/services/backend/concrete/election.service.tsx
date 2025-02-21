import {Election} from '@entities/election.entity';
import {IElectionService} from '../abstract/election.service.interface';
import {GenericBackendService} from './generic.backend.sevice';

export class ElectionService
  extends GenericBackendService<Election>
  implements IElectionService
{
  constructor() {
    super('/election/api/elections');
  }
  async getElectionsByCity(cityId: number): Promise<Election[]> {
    const response = await this.api.get(`/elections/city/${cityId}`);
    return response.data;
  }
}
