import {useState} from 'react';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';
import {electionService} from '@services/backend/concrete/service.container.instances';

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
