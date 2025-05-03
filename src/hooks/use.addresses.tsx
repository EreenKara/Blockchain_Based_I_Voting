import {AddressViewModel} from '@viewmodels/address.viewmodel';
import {useState} from 'react';
import {userAddressService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';
import {addressService} from '@services/backend/concrete/service.container.instances';
import LocationViewModel from '@viewmodels/location.viewmodel';

export const useAddresses = () => {
  const {execute: fetchCities, data: cities} = useAsync<LocationViewModel[]>(
    () => {
      return addressService.getCities();
    },
  );
  const {execute: fetchDistricts, data: districts} = useAsync<
    LocationViewModel[]
  >((cityId: string) => {
    return addressService.getDistrictsByCityId(cityId);
  });
  const {execute: fetchNeighborhoods, data: neighborhoods} = useAsync<
    LocationViewModel[]
  >(() => {
    return addressService.getNeighborhoods();
  });

  return {
    fetchCities,
    fetchDistricts,
    fetchNeighborhoods,
    cities,
    districts,
    neighborhoods,
  };
};
