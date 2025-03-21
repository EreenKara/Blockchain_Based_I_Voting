// hooks/election/useElectionChoices.ts
import {useState} from 'react';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from '@hooks/Modular/use.async';

const useElectionChoices = (electionId: string | null) => {
  const [choices, setChoices] = useState<ElectionChoiceViewModel[]>([]);

  const {
    execute: saveChoices,
    loading: submitting,
    error,
    reset: resetSubmission,
  } = useAsync<void>(
    async (values: ElectionChoiceViewModel[]) => {
      if (!electionId) throw new Error('Election ID is not set.');
      await electionService.putElectionChoices(electionId, values);
    },
    {
      showNotificationOnError: true,
      successMessage: 'Seçenekler başarıyla kaydedildi.',
    },
  );

  const handleElectionChoiceStep = async (
    values: ElectionChoiceViewModel[],
  ): Promise<{success: boolean; error: string | null}> => {
    const result = await saveChoices(values);

    if (result !== null) {
      setChoices(values);
      return {success: true, error: null};
    }

    return {success: false, error: error || 'Bilinmeyen bir hata oluştu.'};
  };

  const reset = () => {
    setChoices([]);
    resetSubmission();
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
