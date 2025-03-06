import {ServiceType} from '@services/backend/concrete/service.container';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import userService, {
  UserService,
} from '@services/backend/concrete/user.service';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
import {useState} from 'react';

const useAddress = () => {
  const userService = ServiceContainer.getService(
    ServiceType.UserService,
  ) as UserService;

  const [address, setAddress] = useState<AddressViewModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (userId: string, addressId: string) => {
    try {
      setLoading(true);
      const address = await userService.getAddressByUserId(userId, addressId);
      //const filteredAddress = addresses.find(a => a.id === address.id);
      //if (filteredAddress) {
      //  filteredAddress.city = address.city;
      //  filteredAddress.district = address.district;
      //  filteredAddress.buildingNo = address.buildingNo;
      //}
      setAddress(address);
    } catch (error) {
      setError('Adres yüklenirken bir hata oluştu. API HATASI.');
    } finally {
      setLoading(false);
    }
  };

  return {address, loading, error, fetchAddress};
};

export default useAddress;
