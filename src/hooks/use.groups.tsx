// hooks/group/useGroups.ts
import {useAsync} from '@hooks/Modular/use.async';
import {userService} from '@services/backend/concrete/service.container.instances';
import GroupViewModel from '@viewmodels/group.viewmodel';

export default function useGroups() {
  const {
    execute: fetchGroups,
    data: groups,
    loading,
    error,
    retry,
    reset,
  } = useAsync<GroupViewModel[]>(
    (userId: string) => userService.getGroupsByUserId(userId),
    {
      showNotificationOnError: true,
    },
  );

  return {
    groups,
    fetchGroups,
    loading,
    error,
    retry,
    reset,
  };
}
