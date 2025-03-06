import {ServiceType} from '@services/backend/concrete/service.container';
import ElectionService from '@services/backend/concrete/election.service';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import {useState} from 'react';
import GroupViewModel from '@viewmodels/group.viewmodel';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';

const useElectionAccess = () => {
  const [electionId, setElectionId] = useState<string | null>(null);
  const [electionAccess, setElectionAccess] = useState<ElectionAccessViewModel>(
    {} as ElectionAccessViewModel,
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleElectionAccessStep = async (values: ElectionAccessViewModel) => {
    if (!electionId) {
      setError('Election ID is not set.');
      return;
    }

    const electionService = ServiceContainer.getService(
      ServiceType.ElectionService,
    ) as ElectionService;
    try {
      setSubmitting(true);

      if (values.accessType === 'public') {
        setElectionAccess({
          accessType: 'public',
          city: values.city,
          district: values.district,
        });
        await electionService.putElectionAccess(electionId, electionAccess);
      } else if (values.accessType === 'private') {
        setElectionAccess({
          accessType: 'private',
          groups: values.groups,
          users: values.users,
        });
        await electionService.putElectionAccess(electionId, electionAccess);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddGroup = (newGroup: GroupViewModel) => {
    if (electionAccess.accessType === 'private') {
      setElectionAccess({
        ...electionAccess,
        groups: [...(electionAccess.groups || []), newGroup],
      });
    }
  };

  const handleAddUser = (newUser: LightUserViewModel) => {
    if (electionAccess.accessType === 'private') {
      setElectionAccess({
        ...electionAccess,
        users: [...(electionAccess.users || []), newUser],
      });
    }
  };

  return {
    electionAccess,
    submitting,
    error,
    setElectionId,
    handleElectionAccessStep,
    handleAddGroup,
    handleAddUser,
  };
};

export default useElectionAccess;
