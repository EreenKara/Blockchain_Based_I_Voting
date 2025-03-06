import {ServiceType} from '@services/backend/concrete/service.container';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import UserService from '@services/backend/concrete/user.service';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
import {useState} from 'react';

export const useAddresses = () => {
  const userService = ServiceContainer.getService(
    ServiceType.UserService,
  ) as UserService;
  const [addresses, setAddresses] = useState<AddressViewModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async (userId: string) => {
    try {
      setLoading(true);
      const addresses = await userService.getAddressesById(userId);
      setAddresses(addresses);
    } catch (error) {
      setError('Adres yüklenirken bir hata oluştu. API HATASI.');
    } finally {
      setLoading(false);
    }
  };

  return {addresses, loading, error, fetchAddresses};
};
