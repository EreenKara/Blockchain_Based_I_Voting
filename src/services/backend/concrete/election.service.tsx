import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {IElectionService} from '../abstract/election.service.interface';
import BaseBackendService from './base.backend.sevice';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';
import {ElectionCreationViewModel} from '@viewmodels/election.creation.viewmodel';
import CandidateCreateViewModel from '@viewmodels/candidate.create.viewmodel';
import {ImageViewModel} from '@viewmodels/image.viewmodel';
import convertImageToBase64 from '@utility/toBase64';
import DetailedElectionViewModel from '@viewmodels/detailed.election.viewmodel';
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
  public async getPrivateElections(
    searchObject: ElectionSearchObject,
  ): Promise<LightElectionViewModel[]> {
    console.log('privateSecim Timeframe log: ', searchObject);
    const response = await this.api.get<{elections: LightElectionViewModel[]}>(
      `${this.endpoint}/auth/private/${searchObject.timeframe}`,
    );
    console.log('responseData:', response.data);
    return response.data.elections;
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
  // ! Election sahibi olmalı
  public async getElectionDetailed(
    electionId: string,
  ): Promise<DetailedElectionViewModel> {
    const response = await this.api.get<{election: DetailedElectionViewModel}>(
      `${this.endpoint}/${electionId}`,
    );
    return response.data.election;
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
      const groupIds: string[] | undefined = electionAccess.groups?.map(
        group => group.id,
      );
      const userIds = electionAccess.users?.map(user => user.id);
      const data = {
        electionId: electionId,
        groups: groupIds,
        users: userIds,
      };
      console.log('Data: ', data);
      await this.api.post<void>(
        `${this.endpoint}/auth/setElectionAccess/private`,
        data,
      );
    }
  }
  public async putElectionCandidates(
    electionId: string,
    candidates: CandidateCreateViewModel[],
  ): Promise<void> {
    console.log('candidates,', candidates);
    const candidatesWithBase64 = await Promise.all(
      candidates.map(async candidate => {
        return {
          ...candidate,
          image: `data:${candidate.image?.type};base64,${candidate.image?.base64}`, // burada artık sadece base64 string olacak
        };
      }),
    );
    console.log('candidates2', candidatesWithBase64);

    await this.api.post<void>(`${this.endpoint}/auth/add-candidates`, {
      electionId: electionId,
      candidates: candidatesWithBase64,
    });
  }
  public async putElectionChoicesDefault(electionId: string) {
    await this.api.post<void>(`${this.endpoint}/auth/add-choices`, {
      electionId,
    });
  }
  public async putElectionChoices(
    electionId: string,
    choices: ElectionChoiceViewModel[],
  ): Promise<void> {
    await this.api.post<ElectionChoiceViewModel[]>(
      `${this.endpoint}/auth/add-choices`,
      {electionId},
    );
  }
  public async electionConfirm(electionId: string): Promise<void> {
    await this.api.post<ElectionChoiceViewModel[]>(
      `${this.endpoint}/auth/confirm`,
      {electionId},
    );
  }

  public async giveVotePublic(
    electionId: string,
    candidateId: string,
  ): Promise<void> {
    await this.api.post(`vote/auth/cast-public`, {electionId, candidateId});
  }
  public async giveVotePrivate(
    electionId: string,
    candidateId: string,
  ): Promise<void> {
    await this.api.post(`vote/auth/cast-private`, {electionId, candidateId});
  }

  public async getElectionByElectionId(
    electionId: string,
  ): Promise<DetailedElectionViewModel> {
    const response = await this.api.get(`${this.endpoint}/${electionId}`);
    return response.data.election;
  }
  public async getTopThreeCandidate(
    electionId: string,
  ): Promise<CandidateViewModel[]> {
    const response = await this.api.get(
      `${this.endpoint}/auth/result/${electionId}`,
    );
    return response.data.topThree;
  }
}

export default ElectionService;

export interface ElectionSearchObject {
  city: string | undefined;
  timeframe: 'past' | 'current' | 'upcoming' | undefined;
}
