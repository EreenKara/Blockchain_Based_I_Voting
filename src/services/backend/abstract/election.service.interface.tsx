import {Election} from '@entities/election.entity';
import {IGenericBackendService} from './generic.backend.service.interface';

export interface IElectionService extends IGenericBackendService<Election> {}
