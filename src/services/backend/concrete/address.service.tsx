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
import LocationViewModel from '@viewmodels/location.viewmodel';

interface Cities {
  cities: {id: string; name: string}[];
}
interface Districts {
  districts: {id: string; name: string}[];
}
interface Neighborhoods {
  hoods: {id: string; name: string}[];
}

export class AddressService extends BaseBackendService {
  constructor() {
    super('');
  }
  public async getCities(): Promise<LocationViewModel[]> {
    const response = await this.api.get<Cities>(`${this.endpoint}/city/list`);
    return response.data.cities;
  }
  public async getDistricts(): Promise<LocationViewModel[]> {
    const response = await this.api.get<Districts>(
      `${this.endpoint}/district/list`,
    );
    return response.data.districts;
  }
  public async getDistrictsByCityId(
    cityId: string,
  ): Promise<LocationViewModel[]> {
    const response = await this.api.get<Districts>(
      `${this.endpoint}/district/getDistrictsByCityId`,
      {params: {cityId}},
    );
    return response.data.districts;
  }
  public async getNeighborhoods(): Promise<LocationViewModel[]> {
    const response = await this.api.get<Neighborhoods>(
      `${this.endpoint}/neighborhood/list`,
    );
    return response.data.hoods;
  }
}

export default AddressService;
