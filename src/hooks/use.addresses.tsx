import {AddressViewModel} from '@viewmodels/address.viewmodel';
import {useState} from 'react';
import {userService} from '@services/backend/concrete/service.container.instances';

export const useAddresses = () => {
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
