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

export class UserAddressService extends BaseBackendService {
  constructor() {
    super('/userAddress');
  }
  async getAddressesById(userId: string): Promise<AddressViewModel[]> {
    const response = await this.api.get<AddressViewModel[]>(
      `${this.endpoint}/getAdressByUserId/${userId}`,
    );
    return response.data;
  }
  // Bu suan uygulamada da yok backend'de de yok.
  public async getAddressById(addressId: string): Promise<AddressViewModel> {
    const response = await this.api.get<AddressViewModel>(
      `${this.endpoint}/address/${addressId}`,
    );
    return response.data;
  }
}

export default UserAddressService;
