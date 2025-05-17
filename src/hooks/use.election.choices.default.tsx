import GroupViewModel from '@viewmodels/group.viewmodel';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';
import DetailedElectionViewModel from '@viewmodels/detailed.election.viewmodel';

export default function useElectionChoicesDefault() {
  const {
    execute: sendDefaultChoices,
    loading,
    error,
    success,
  } = useAsync<void>(
    electionId => electionService.putElectionChoicesDefault(electionId),
    {
      showNotificationOnError: true,
      successMessage: 'Election choices sended successfully',
    },
  );

  return {
    sendDefaultChoices,
    loading,
    error,
    success,
  };
}
