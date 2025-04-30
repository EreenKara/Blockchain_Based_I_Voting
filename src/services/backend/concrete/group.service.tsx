import {IUserService} from '@services/backend/abstract/user.service.interface';
import BaseBackendService from './base.backend.sevice';
import axios, {AxiosError} from 'axios';
import RegisterViewModel from '@viewmodels/register.viewmodel';
import LoginViewModel from '@viewmodels/login.viewmodel';
import UserViewModel from '@viewmodels/user.viewmodel';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';
import {BackendError} from './backend.error';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';
import LightGroupViewModel from '@viewmodels/light.group.viewmodel';

export class GroupService extends BaseBackendService {
  constructor() {
    super('/group');
  }

  public async getGroupsByUserId(userId: string): Promise<GroupViewModel[]> {
    const response = await this.api.get<GroupViewModel[]>(
      `${this.endpoint}/${userId}`,
    );
    return response.data;
  }
  public async getGroupsCurrentUser(): Promise<LightGroupViewModel[]> {
    const response = await this.api.get<{
      success: boolean;
      data: LightGroupViewModel[];
    }>(`${this.endpoint}/getAllGroups`);
    return response.data.data;
  }
  public async getGroupUsersById(groupId: string): Promise<GroupViewModel> {
    const response = await this.api.get<GroupViewModel>(
      `${this.endpoint}/getGroupWithUsers/${groupId}`,
    );

    return response.data;
  }
  public async createGroup(group: GroupViewModel): Promise<void> {
    const userIds = group.users.map(user => user.id);
    const form = {
      name: group.name,
      description: 'Boş',
      users: userIds,
    };
    const response = await this.api.post<GroupViewModel>(
      `${this.endpoint}/auth/createGroup`,
      form,
    );
  }
  public async getGroupById(
    groupId: string,
    offset: number,
    pageSize: number,
  ): Promise<GroupViewModel> {
    const response = await this.api.get<GroupViewModel>(
      `${this.endpoint}/group/${groupId}?offset=${offset}&pageSize=${pageSize}`,
    );
    return response.data;
  }
}

export default GroupService;
