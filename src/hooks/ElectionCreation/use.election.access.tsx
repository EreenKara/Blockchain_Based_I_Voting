import {ServiceType} from '@services/backend/concrete/service.container';
import ElectionService from '@services/backend/concrete/election.service';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import {useState} from 'react';

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

    const electionService = ServiceContainer.getService(
      ServiceType.ElectionService,
    ) as ElectionService;
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

  return {
    electionAccess,
    submitting,
    error,
    handleElectionAccessStep,
  };
};

export default useElectionAccess;
