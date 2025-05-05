// hooks/election/useElectionCandidate.ts
import {useCallback, useState} from 'react';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from '@hooks/Modular/use.async';
import CandidateCreateViewModel from '@viewmodels/candidate.create.viewmodel';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';

const useElectionCandidate = (electionId: string | null) => {
  const [users, setUsers] = useState<Array<LightUserViewModel | null>>([]);

  const [candidates, setCandidates] = useState<CandidateCreateViewModel[]>([
    {
      id: '',
      name: '',
      color: '#000000',
      image: null,
      userId: null,
    },
    {
      id: '',
      name: '',
      color: '#000000',
      image: null,
      userId: null,
    },
  ]);

  const {
    execute: saveCandidates,
    loading: submitting,
    error,
    success,
    reset: resetSubmission,
  } = useAsync<void>(
    async (newCandidates: CandidateCreateViewModel[]) => {
      if (!electionId) throw new Error('Election ID is not set.');
      await electionService.putElectionCandidates(electionId, newCandidates);
    },
    {
      showNotificationOnError: true,
      successMessage: 'Adaylar başarıyla kaydedildi.',
    },
  );
  const updateCandidateAt = (
    index: number,
    updatedCandidate: CandidateCreateViewModel,
  ) => {
    setCandidates(prev => {
      const updated = [...prev];
      updated[index] = updatedCandidate;
      return updated;
    });
  };

  const addCandidate = () => {
    setCandidates(prev => [
      ...prev,
      {
        id: '',
        name: '',
        color: '#000000',
        image: null,
        userId: null,
      },
    ]);
    setUsers(prev => [...prev, null]);
  };
  const setUserWrapper = useCallback(
    (index: number, updatedUser: LightUserViewModel | null) => {
      setUsers(prev => {
        const updated = [...prev];
        updated[index] = updatedUser;
        return updated;
      });
    },
    [],
  );
  const handleElectionCandidateStep = async (
    newCandidates: CandidateCreateViewModel[],
  ): Promise<{success: boolean; error: string | null}> => {
    const result = await saveCandidates(newCandidates);

    if (result !== null) {
      setCandidates(newCandidates);
      return {success: true, error: null};
    }

    return {success: false, error: error || 'Adaylar kaydedilemedi.'};
  };

  const reset = () => {
    setCandidates([]);
    resetSubmission();
  };

  return {
    candidates,
    submitting,
    error,
    updateCandidateAt,
    addCandidate,
    handleElectionCandidateStep,
    reset,
    users,
    setUserWrapper,
    success,
  };
};

export default useElectionCandidate;
