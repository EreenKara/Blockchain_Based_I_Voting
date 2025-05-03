import {useState, useEffect} from 'react';
import {useCache} from './Modular/use.cache';
import {useAppStateListener} from './Modular/use.appstate.listener';
import {useNetworkListener} from './Modular/use.network.listener';
import {useBackgroundFetch} from './Modular/use.background.fetch';
import GroupViewModel from '@viewmodels/group.viewmodel';
import {BackendError} from '@services/backend/concrete/backend.error';
import {groupService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';

export default function useCreateGroup() {
  const {
    execute: createGroup,
    loading,
    error,
    data,
    success,
  } = useAsync<void>(
    (group: GroupViewModel) => groupService.createGroup(group),
    {
      showNotificationOnError: true,
      successMessage: 'Grup Başarıyla Oluşturuldu.',
    },
  );

  return {
    createGroup,
    data,
    loading,
    error,
    success,
  };
}
