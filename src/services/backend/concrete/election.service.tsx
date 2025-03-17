import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {IElectionService} from '../abstract/election.service.interface';
import BaseBackendService from './base.backend.sevice';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';

export class ElectionService
  extends BaseBackendService
  implements IElectionService
{
  constructor() {
    super('/election/api/elections');
  }
  public async getPopularElections(): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/popular`,
    );
    return response.data;
  }
  public async getPastElections(
    city: string,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/past/${city}`,
    );
    return response.data;
  }
  public async getCurrentElections(
    city: string,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/current/${city}`,
    );
    return response.data;
  }
  public async getUpcomingElections(
    city: string,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/upcoming/${city}`,
    );
    return response.data;
  }
  public async getElectionsByUserId(
    userId: string,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/user/${userId}`,
    );
    return response.data;
  }
  public async postElectionInfo(
    election: ElectionViewModel,
  ): Promise<ElectionViewModel> {
    const response = await this.api.post<ElectionViewModel>(
      `${this.endpoint}`,
      election,
    );
    return response.data;
  }
  public async putElectionAccess(
    electionId: string,
    electionAccess: ElectionAccessViewModel,
  ): Promise<void> {
    await this.api.put<ElectionViewModel>(
      `${this.endpoint}/${electionId}`,
      electionAccess,
    );
  }
  public async putElectionCandidates(
    electionId: string,
    candidates: CandidateViewModel[],
  ): Promise<void> {
    await this.api.put<CandidateViewModel[]>(
      `${this.endpoint}/${electionId}/candidates`,
      candidates,
    );
  }
  public async putElectionChoices(
    electionId: string,
    choices: ElectionChoiceViewModel[],
  ): Promise<void> {
    await this.api.put<ElectionChoiceViewModel[]>(
      `${this.endpoint}/${electionId}/choices`,
      choices,
    );
  }
  public async giveVote(
    electionId: string,
    candidateId: string,
  ): Promise<void> {
    await this.api.post(`${this.endpoint}/${electionId}/vote`, {candidateId});
  }
}

export default ElectionService;
