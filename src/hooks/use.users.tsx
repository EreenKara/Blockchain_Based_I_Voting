// hooks/user/useUsers.ts
import {useAsync} from '@hooks/Modular/use.async';
import {userService} from '@services/backend/concrete/service.container.instances';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';

export default function useUsers() {
  const {
    execute: fetchUsers,
    data: users,
    loading,
    error,
    retry,
    reset,
  } = useAsync<LightUserViewModel[]>(() => userService.getUsers(), {
    showNotificationOnError: true,
  });

  return {
    users,
    fetchUsers,
    loading,
    error,
    retry,
    reset,
  };
}
