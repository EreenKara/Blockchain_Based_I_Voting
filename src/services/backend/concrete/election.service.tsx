import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {IElectionService} from '../abstract/election.service.interface';
import BaseBackendService from './base.backend.sevice';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';
import {ElectionCreationViewModel} from '@viewmodels/election.creation.viewmodel';

export class ElectionService
  extends BaseBackendService
  implements IElectionService
{
  constructor() {
    super('/election');
  }
  public async getPopularElections(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/getElections/all`,
    );
    console.log('getPopularElections response:', response.data);
    console.log('getPopularElections response.data::', response.data);
    return response.data;
  }
  // ! PUBLIC
  public async getPastElections(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    console.log('getPastElections searchObject:', searchObject);
    console.log('getPastElections searchObject.city:', searchObject.city);
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/public/past`,
      {params: {city: searchObject.city}},
    );
    return response.data;
  }
  // ! PRIVATE
  public async getPastElectionsAuthUser(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/auth/private/past`,
    );
    return response.data;
  }
  // ! PUBLIC
  public async getCurrentElections(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/public/current`,
      {params: {city: searchObject.city}},
    );
    return response.data;
  }
  // ! PRIVATE
  public async getCurrentElectionsAuthUser(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/auth/private/current`,
    );
    return response.data;
  }
  // ! PUBLIC
  public async getUpcomingElections(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/public/upcoming`,
      {params: {city: searchObject.city}},
    );
    return response.data;
  }
  // ! PRIVATE
  public async getUpcomingElectionsAuthUser(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/auth/private/upcoming`,
    );
    return response.data;
  }
  public async getMyElections(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/auth/mine`,
    );
    return response.data;
  }
  public async getElectionsByUserId(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    const response = await this.api.get<LightElectionViewModel[]>(
      `${this.endpoint}/user`,
    );
    return response.data;
  }
  public async postElectionInfo(
    election: ElectionCreationViewModel,
  ): Promise<ElectionCreationViewModel> {
    const formData = new FormData();
    formData.append('name', election.name);
    formData.append('description', election.description);
    formData.append('startDate', election.startDate.toString());
    formData.append('endDate', election.endDate.toString());
    formData.append('electionType', election.electionType);
    if (election.image?.uri && election.image?.name && election.image?.type) {
      formData.append('image', {
        uri: election.image?.uri,
        name: election.image?.name, // İstersen dosya adını dinamik de alabilirsin
        type: election.image?.type, // veya 'image/png' vs.
      });
    }
    const response = await this.api.post(
      `${this.endpoint}/auth/create-election`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('Election creation response:', response);
    console.log('Election creation response DATA:', response.data);
    return response.data;
  }
  public async putElectionAccess(
    electionId: string,
    electionAccess: ElectionAccessViewModel,
  ): Promise<void> {
    if (electionAccess.accessType === 'public') {
      const data = {
        electionId: electionId,
        cityId: electionAccess.cityId,
        districtId: electionAccess.districtId,
      };
      await this.api.post<void>(
        `${this.endpoint}/auth/setElectionAccess/public`,
        data,
      );
    } else if (electionAccess.accessType === 'private') {
      const data = {
        electionId: electionId,
        groups: electionAccess.groups,
        users: electionAccess.users,
      };
      await this.api.post<void>(
        `${this.endpoint}/auth/setElectionAccess/private/${electionId}`,
        data,
      );
    }
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

export interface ElectionSearchObject {
  city: string | undefined;
}
