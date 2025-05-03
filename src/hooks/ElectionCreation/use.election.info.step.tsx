// hooks/election/useElectionInfoStep.ts
import {useState} from 'react';
import {FormValues} from '@screens/home/ElectionInfo';
import {useAsync} from '@hooks/Modular/use.async';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useNotification} from '@contexts/notification.context';
import {ElectionCreationViewModel} from '@viewmodels/election.creation.viewmodel';

const useElectionInfoStep = () => {
  const [electionType, setElectionType] = useState<
    'database' | 'blockchain' | null
  >(null);
  const {showNotification} = useNotification();
  const {
    execute: createElection,
    loading: submitting,
    error,
    reset: resetElection,
    data: election,
  } = useAsync<ElectionCreationViewModel>(
    (electionData: ElectionCreationViewModel) =>
      electionService.postElectionInfo(electionData),
    {
      showNotificationOnError: true,
      successMessage: 'Seçim bilgileri başarıyla kaydedildi.',
    },
  );

  const handleElectionInfoStep = async (
    values: FormValues,
  ): Promise<{
    success: boolean;
    error: string | null;
  }> => {
    if (!electionType) {
      showNotification({
        message: 'Veri saklama tipi seçilmelidir.',
        type: 'error',
        modalType: 'snackbar',
      });
      return {
        success: false,
        error: 'Veri saklama tipi seçilmelidir.',
      };
    }

    const electionPayload: ElectionCreationViewModel = {
      id: '',
      name: values.title,
      description: values.description,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      image: {
        uri: values.image?.uri || null,
        type: values.image?.type || null,
        name: values.image?.fileName || null,
      } as {uri: string; type: string; name: string} | null,
      electionType,
      step: 'Info completed',
    };
    console.log('Election Payload:', electionPayload);

    const created = await createElection(electionPayload);

    return {
      success: !!created,
      error: created ? null : 'Seçim oluşturulamadı.',
    };
  };

  const reset = () => {
    resetElection();
    setElectionType(null);
  };

  return {
    election,
    handleElectionInfoStep,
    electionType,
    setElectionType,
    submitting,
    error,
    reset,
  };
};

export default useElectionInfoStep;
