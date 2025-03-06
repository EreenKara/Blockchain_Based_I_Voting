import React, {createContext, useState, useContext, useEffect} from 'react';
import UserViewModel from '@viewmodels/user.viewmodel';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {ServiceType} from '@services/backend/concrete/service.container';
import UserService from '@services/backend/concrete/user.service';
import useGroups from '@hooks/use.groups';
import GroupViewModel from '@viewmodels/group.viewmodel';
import {useAddresses} from '@hooks/use.addresses';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
import useGroup from '@hooks/use.group';

interface UserProfileContextType {
  user: UserViewModel | null;
  fetchUser: () => Promise<void>;
  loading: boolean;
  error: string | null;
  groups: GroupViewModel[];
  groupsError: string | null;
  groupsLoading: boolean;
  fetchGroups: (userId: string) => Promise<void>;
  addresses: AddressViewModel[];
  addressesError: string | null;
  addressesLoading: boolean;
  fetchAddresses: (userId: string) => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined,
);

const UserProfileProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<UserViewModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    groups,
    error: groupsError,
    loading: groupsLoading,
    fetchGroups,
  } = useGroups();
  const {
    addresses,
    error: addressesError,
    loading: addressesLoading,
    fetchAddresses,
  } = useAddresses();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userService = ServiceContainer.getService(
        ServiceType.UserService,
      ) as UserService;
      const response = await userService.getCurrentUser();
      if (response) {
        setUser(response);
      }
    } catch (error) {
      setError('Kullanıcı bilgileri yüklenirken bir hata oluştu.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        user,
        fetchUser,
        loading,
        error,
        groups,
        groupsError,
        groupsLoading,
        fetchGroups,
        addresses,
        addressesError,
        addressesLoading,
        fetchAddresses,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
};
const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error(
      'useUserProfile must be used within an UserProfileProvider',
    );
  }
  return context;
};

export {UserProfileProvider, useUserProfileContext};
