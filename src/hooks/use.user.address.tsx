import {AddressViewModel} from '@viewmodels/address.viewmodel';
import {useState} from 'react';
import {userAddressService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';

export const useUserAddress = () => {
  const {
    execute: fetchAddress,
    data: address,
    loading,
    error,
  } = useAsync<AddressViewModel>(() => {
    return userAddressService.getAddress();
  });

  return {address, loading, error, fetchAddress};
};
