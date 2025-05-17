// hooks/group/useGroups.ts
import {useAsync} from '@hooks/Modular/use.async';
import {groupService} from '@services/backend/concrete/service.container.instances';
import GroupViewModel from '@viewmodels/group.viewmodel';
import LightGroupViewModel from '@viewmodels/light.group.viewmodel';

export default function useGroups() {
  const {
    execute: fetchGroups,
    data: groups,
    loading,
    error,
    retry,
    reset,
  } = useAsync<LightGroupViewModel[]>(
    () => groupService.getGroupsCurrentUser(),
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
