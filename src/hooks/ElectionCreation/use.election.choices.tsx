import {ServiceType} from '@services/backend/concrete/service.container';
import ElectionService from '@services/backend/concrete/election.service';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {useState} from 'react';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';

const useElectionChoices = (electionId: string | null) => {
  const [choices, setChoices] = useState<ElectionChoiceViewModel[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Aday ekleme/güncelleme işlemini yürüten fonksiyon
  const handleElectionChoiceStep = async (
    choices: ElectionChoiceViewModel[],
  ): Promise<boolean> => {
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
      await electionService.putElectionChoices(electionId, choices);
      setChoices(choices);
      setSubmitting(false);
      return true;
    } catch (error: any) {
      setError(error.message);
      setSubmitting(false);
      return false;
    }
  };

  const reset = () => {
    setChoices([]);
    setSubmitting(false);
    setError(null);
  };

  return {
    choices,
    submitting,
    error,
    handleElectionChoiceStep,
    reset,
  };
};

export default useElectionChoices;
