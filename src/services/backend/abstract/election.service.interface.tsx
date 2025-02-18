import {Election} from '@entities/election.entity';
import {GenericBackendService} from '../concrete/generic.backend.sevice';

export interface IElectionService extends GenericBackendService<Election> {
  getElectionsByCity(cityId: number): Promise<Election[]>;
}
