import GroupViewModel from '@viewmodels/group.viewmodel';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from './Modular/use.async';
import DetailedElectionViewModel from '@viewmodels/detailed.election.viewmodel';

export interface UseConfirmElectionProps {
  groupId: string;
}
export default function useConfirmElection() {
  const {
    execute: fetchElectionDetail,
    loading: fetchLoading,
    error: fetchError,
    data: election,
    success: fetchSuccess,
  } = useAsync<DetailedElectionViewModel>(electionId =>
    electionService.getElectionDetailed(electionId),
  );
  const {
    execute: confirmElection,
    loading: confirmLoading,
    error: confirmError,
    success: confirmSuccess,
  } = useAsync<void>(
    electionId => electionService.electionConfirm(electionId),
    {
      showNotificationOnError: true,
      successMessage: 'Election confirmed successfully',
    },
  );

  return {
    fetchElectionDetail,
    election,
    fetchError,
    fetchLoading,
    fetchSuccess,
    confirmElection,
    confirmLoading,
    confirmError,
    confirmSuccess,
  };
}
