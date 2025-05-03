import {AddressViewModel} from '@viewmodels/address.viewmodel';
import {useState} from 'react';
import {userAddressService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';
import {AddressChangeViewModel} from '@viewmodels/address.change.viewmodel';

export const useAddressChange = () => {
  const {
    execute: changeAddress,
    data: address,
    loading,
    error,
    success,
  } = useAsync<AddressViewModel>((address: AddressChangeViewModel) => {
    return userAddressService.changeAddress(address);
  });

  return {address, loading, error, success, changeAddress};
};
