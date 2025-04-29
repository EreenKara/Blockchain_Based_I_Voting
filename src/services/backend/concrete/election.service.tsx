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
    super('/election');
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
    const formData = new FormData();
    formData.append('name', election.name);
    formData.append('description', election.description);
    formData.append('startDate', election.startDate.toString());
    formData.append('endDate', election.endDate.toString());
    formData.append('electionType', election.dbType);
    formData.append('file', {
      uri: election.image?.uri,
      name: election.image?.name, // İstersen dosya adını dinamik de alabilirsin
      type: election.image?.type, // veya 'image/png' vs.
    });
    const response = await this.api.post(
      `${this.endpoint}/auth/create-election`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
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
