import React, {createContext, useState, useContext, useEffect} from 'react';
import UserViewModel from '@viewmodels/user.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';
import {useAddresses} from '@hooks/use.addresses';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
import {userService} from '@services/backend/concrete/service.container.instances';
import {groupService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from '@hooks/Modular/use.async';
import {useNotification} from '@contexts/notification.context';
import LightGroupViewModel from '@viewmodels/light.group.viewmodel';

interface UserProfileContextType {
  user: UserViewModel | null;
  fetchUser: () => Promise<UserViewModel | null>;
  loading: boolean;
  error: string | null;
  groups: LightGroupViewModel[] | null;
  groupsError: string | null;
  groupsLoading: boolean;
  fetchGroups: () => Promise<LightGroupViewModel[] | null>;
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
  const {
    execute: fetchGroups,
    data: groups,
    loading: groupsLoading,
    error: groupsError,
  } = useAsync<LightGroupViewModel[]>(
    () => groupService.getGroupsCurrentUser(),
    {
      showNotificationOnError: true,
    },
  );

  const {
    addresses,
    error: addressesError,
    loading: addressesLoading,
    fetchAddresses,
  } = useAddresses();

  const {
    execute: fetchUser,
    data: user,
    loading,
    error,
  } = useAsync<UserViewModel>(() => userService.getCurrentUser(), {
    showNotificationOnError: true,
  });

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
