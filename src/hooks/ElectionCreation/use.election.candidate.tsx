import {ServiceType} from '@services/backend/concrete/service.container';
import ElectionService from '@services/backend/concrete/election.service';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {useState} from 'react';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';

const useElectionCandidate = (electionId: string | null) => {
  const [candidates, setCandidates] = useState<CandidateViewModel[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Aday ekleme/güncelleme işlemini yürüten fonksiyon
  const handleElectionCandidateStep = async (
    newCandidates: CandidateViewModel[],
  ) => {
    if (!electionId) {
      setError('Election ID is not set.');
      return false;
    }

    const electionService = ServiceContainer.getService(
      ServiceType.ElectionService,
    ) as ElectionService;

    try {
      setSubmitting(true);
      // Örnek: putElectionCandidates gibi bir fonksiyon ile API'ya gönderin
      await electionService.putElectionCandidates(electionId, newCandidates);
      setCandidates(newCandidates);
      setSubmitting(false);
      return true;
    } catch (error: any) {
      setError(error.message);
      setSubmitting(false);
      return false;
    }
  };

  const reset = () => {
    setCandidates([]);
    setSubmitting(false);
    setError(null);
  };

  return {
    candidates,
    submitting,
    error,
    handleElectionCandidateStep,
    reset,
  };
};

export default useElectionCandidate;
