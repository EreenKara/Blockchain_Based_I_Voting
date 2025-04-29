// hooks/group/useGroups.ts
import {useAsync} from '@hooks/Modular/use.async';
import {groupService} from '@services/backend/concrete/service.container.instances';
import GroupViewModel from '@viewmodels/group.viewmodel';

export default function useGroups() {
  const {
    execute: fetchGroups,
    data: groups,
    loading,
    error,
    retry,
    reset,
  } = useAsync<GroupViewModel[]>(() => groupService.getGroupsCurrentUser(), {
    showNotificationOnError: true,
  });

  return {
    groups,
    fetchGroups,
    loading,
    error,
    retry,
    reset,
  };
}
