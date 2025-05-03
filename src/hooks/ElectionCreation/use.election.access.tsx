// hooks/election/useElectionAccess.ts
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import {useState} from 'react';
import {electionService} from '@services/backend/concrete/service.container.instances';
import {useAsync} from '@hooks/Modular/use.async';

const useElectionAccess = (electionId: string | null) => {
  const [electionAccess, setElectionAccess] = useState<ElectionAccessViewModel>(
    {} as ElectionAccessViewModel,
  );

  const {
    execute: saveAccess,
    loading: submitting,
    error,
    reset: resetSubmission,
  } = useAsync<void>(
    async (values: ElectionAccessViewModel) => {
      if (!electionId) throw new Error('Election ID is not set.');

      let accessData: ElectionAccessViewModel;

      if (values.accessType === 'public') {
        accessData = {
          accessType: 'public',
          cityId: values.cityId,
          districtId: values.districtId,
        };
      } else if (values.accessType === 'private') {
        accessData = {
          accessType: 'private',
          groups: values.groups,
          users: values.users,
        };
      } else {
        throw new Error('Geçersiz erişim tipi');
      }

      await electionService.putElectionAccess(electionId, accessData);
    },
    {
      showNotificationOnError: true,
      successMessage: 'Erişim bilgileri başarıyla kaydedildi.',
    },
  );

  const handleElectionAccessStep = async (
    values: ElectionAccessViewModel,
  ): Promise<{success: boolean; error: string | null}> => {
    const result = await saveAccess(values);
    if (result !== null) {
      setElectionAccess(values);
    }
    return {
      success: result !== null,
      error:
        result === null ? error || 'Erişim bilgileri kaydedilemedi.' : null,
    };
  };

  const reset = () => {
    setElectionAccess({} as ElectionAccessViewModel);
    resetSubmission();
  };

  return {
    electionAccess,
    submitting,
    error,
    handleElectionAccessStep,
    reset,
  };
};

export default useElectionAccess;
