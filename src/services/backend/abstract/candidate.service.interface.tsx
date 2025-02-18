import {Candidate} from '@entities/candidate.entity';
import {GenericBackendService} from '../concrete/generic.backend.sevice';

export interface ICandidateService extends GenericBackendService<Candidate> {
  getCandidatesByElection(electionId: number): Promise<Candidate[]>;
}
