import {FormValues} from '@screens/home/ElectionInfo';
import ElectionService from '@services/backend/concrete/election.service';
import {
  ServiceContainer,
  ServiceType,
} from '@services/backend/concrete/service.container';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {BackendError} from '@services/backend/concrete/backend.error';
import {createContext, useContext, useState} from 'react';
import GroupViewModel from '@viewmodels/group.viewmodel';
import LightUserViewModel from '@viewmodels/light.user.viewmodel';
import useElectionInfoStep from '@hooks/use.election.info.step';
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import useElectionAccess from '@hooks/use.election.access';

interface ElectionCreationContextType {
  election: ElectionViewModel | null;
  electionAccess: ElectionAccessViewModel | null;
  submitting: boolean;
  error: string | null;
  handleElectionInfoStep: (values: FormValues) => Promise<void>;
  handleElectionAccessStep: (values: ElectionAccessViewModel) => Promise<void>;
  setElectionId: (id: string) => void;
  handleAddGroup: (group: GroupViewModel) => void;
  handleAddUser: (user: LightUserViewModel) => void;
}

const ElectionCreationContext = createContext<
  ElectionCreationContextType | undefined
>(undefined);

const ElectionCreationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {
    election,
    error: infoError,
    submitting: infoSubmitting,
    handleElectionInfoStep,
  } = useElectionInfoStep();

  const {
    electionAccess,
    error: accessError,
    submitting: accessSubmitting,
    handleElectionAccessStep,
    setElectionId,
    handleAddGroup,
    handleAddUser,
  } = useElectionAccess();

  return (
    <ElectionCreationContext.Provider
      value={{
        election,
        electionAccess,
        submitting: infoSubmitting || accessSubmitting,
        error: infoError || accessError,
        handleElectionInfoStep,
        handleElectionAccessStep,
        setElectionId,
        handleAddGroup,
        handleAddUser,
      }}>
      {children}
    </ElectionCreationContext.Provider>
  );
};

const useElectionCreationContext = () => {
  const context = useContext(ElectionCreationContext);

  if (context === undefined) {
    throw new Error(
      'useElectionCreationContext must be used within a ElectionCreationProvider',
    );
  }
  return context;
};

export {ElectionCreationProvider, useElectionCreationContext};
