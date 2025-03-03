import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {IElectionService} from '../abstract/election.service.interface';
import BaseBackendService from './base.backend.sevice';

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
}

export default ElectionService;
