// hooks/election/useElectionCandidate.ts
import {useState} from 'react';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from '@hooks/Modular/use.async';

const useElectionCandidate = (electionId: string | null) => {
  const [candidates, setCandidates] = useState<CandidateViewModel[]>([
    {
      id: '',
      name: '',
      color: '#000000',
      votes: 0,
      image: '',
    },
    {
      id: '',
      name: '',
      color: '#000000',
      votes: 0,
      image: '',
    },
  ]);

  const {
    execute: saveCandidates,
    loading: submitting,
    error,
    reset: resetSubmission,
  } = useAsync<void>(
    async (newCandidates: CandidateViewModel[]) => {
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
    updatedCandidate: CandidateViewModel,
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
        votes: 0,
        image: '',
      },
    ]);
  };

  const handleElectionCandidateStep = async (
    newCandidates: CandidateViewModel[],
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
  };
};

export default useElectionCandidate;
