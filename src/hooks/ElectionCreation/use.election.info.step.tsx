// hooks/election/useElectionInfoStep.ts
import {useState} from 'react';
import {FormValues} from '@screens/home/ElectionInfo';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {useAsync} from '@hooks/Modular/use.async';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useNotification} from '@contexts/notification.context';

const useElectionInfoStep = () => {
  const [dbType, setDbType] = useState<'database' | 'blockchain' | null>(null);
  const {showNotification} = useNotification();
  const {
    execute: createElection,
    loading: submitting,
    error,
    reset: resetElection,
    data: election,
  } = useAsync<ElectionViewModel>(
    (electionData: ElectionViewModel) =>
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
    if (!dbType) {
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

    const electionPayload: ElectionViewModel = {
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
      dbType,
      step: 'step 1',
    };

    const created = await createElection(electionPayload);

    return {
      success: !!created,
      error: created ? null : 'Seçim oluşturulamadı.',
    };
  };

  const reset = () => {
    resetElection();
    setDbType(null);
  };

  return {
    election,
    handleElectionInfoStep,
    dbType,
    setDbType,
    submitting,
    error,
    reset,
  };
};

export default useElectionInfoStep;
