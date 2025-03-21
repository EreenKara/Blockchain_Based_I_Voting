import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import {useState} from 'react';
import {electionService} from '@services/backend/concrete/service.container.instances';

const useElectionAccess = (electionId: string | null) => {
  const [electionAccess, setElectionAccess] = useState<ElectionAccessViewModel>(
    {} as ElectionAccessViewModel,
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleElectionAccessStep = async (values: ElectionAccessViewModel) => {
    if (!electionId) {
      setError('Election ID is not set.');
      return false;
    }
    try {
      setSubmitting(true);
      let electAccess: ElectionAccessViewModel = {};
      if (values.accessType === 'public') {
        electAccess = {
          accessType: 'public',
          city: values.city,
          district: values.district,
        };
      } else if (values.accessType === 'private') {
        electAccess = {
          accessType: 'private',
          groups: values.groups,
          users: values.users,
        };
      }
      await electionService.putElectionAccess(electionId, electAccess);
      setElectionAccess(electAccess);
      setSubmitting(false);
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const reset = () => {
    setElectionAccess({} as ElectionAccessViewModel);
    setSubmitting(false);
    setError(null);
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
