// hooks/group/useGroups.ts
import {useAsync} from '@hooks/Modular/use.async';
import {electionService} from '@services/backend/concrete/service.container.instances';
import CandidateViewModel from '@viewmodels/candidate.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';
import LightGroupViewModel from '@viewmodels/light.group.viewmodel';

export default function useWinner() {
  const {
    execute: fetchTopThree,
    data: candidates,
    loading,
    error,
    success,
    retry,
    reset,
  } = useAsync<CandidateViewModel[]>(
    (electionId: string) => electionService.getTopThreeCandidate(electionId),
    {
      showNotificationOnError: true,
    },
  );

  return {
    candidates,
    fetchTopThree,
    loading,
    error,
    success,
    retry,
    reset,
  };
}
