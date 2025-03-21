import {FormValues} from '@screens/home/ElectionInfo';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import React, {createContext, useContext, useState} from 'react';
import useElectionInfoStep from '@hooks/ElectionCreation/use.election.info.step';
import {ElectionAccessViewModel} from '@viewmodels/election.access.viewmodel';
import useElectionAccess from '@hooks/ElectionCreation/use.election.access';
import useElectionCandidate from '@hooks/ElectionCreation/use.election.candidate';
import {CandidateViewModel} from '@viewmodels/candidate.viewmodel';
import useElectionChoices from '@hooks/ElectionCreation/use.election.choices';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';

interface ElectionCreationContextType {
  election: ElectionViewModel | null;
  electionAccess: ElectionAccessViewModel | null;
  candidates: CandidateViewModel[];
  choices: ElectionChoiceViewModel[];
  dbType: 'database' | 'blockchain' | null;
  setDbType: (dbType: 'database' | 'blockchain' | null) => void;
  electionId: string | null;
  step: number;
  submitting: {
    info: boolean;
    access: boolean;
    candidate: boolean;
    choice: boolean;
  };
  errors: {
    info: string | null;
    access: string | null;
    candidate: string | null;
    choice: string | null;
  };

  // Adım yönetimi

  // Fonksiyonlar
  handleElectionInfoStep: (
    values: FormValues,
  ) => Promise<{success: boolean; error: string | null}>;
  handleElectionAccessStep: (
    values: ElectionAccessViewModel,
  ) => Promise<{success: boolean; error: string | null}>;
  handleElectionCandidateStep: (
    values: CandidateViewModel[],
  ) => Promise<{success: boolean; error: string | null}>;
  handleElectionChoiceStep: (
    values: ElectionChoiceViewModel[],
  ) => Promise<{success: boolean; error: string | null}>;
  resetElectionCreation: () => void;
}

const ElectionCreationContext = createContext<
  ElectionCreationContextType | undefined
>(undefined);

export const ElectionCreationProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  // Tek bir electionId
  const [electionId, setElectionId] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  // 1) Info adımı
  const {
    election,
    submitting: infoSubmitting,
    handleElectionInfoStep: originalHandleElectionInfoStep,
    setDbType,
    dbType,
    reset: resetInfo,
    error: infoError,
  } = useElectionInfoStep();

  // 2) Access adımı
  //    Artık useElectionAccess'e electionId parametresini veriyoruz
  const {
    electionAccess,
    submitting: accessSubmitting,
    handleElectionAccessStep: originalHandleElectionAccessStep,
    reset: resetAccess,
    error: accessError,
  } = useElectionAccess(electionId);

  // 3) Candidate adımı
  const {
    candidates,
    submitting: candidateSubmitting,
    handleElectionCandidateStep: originalHandleElectionCandidateStep,
    reset: resetCandidate,
    error: candidateError,
  } = useElectionCandidate(electionId);

  // 4) Choice adımı
  const {
    choices,
    submitting: choiceSubmitting,
    handleElectionChoiceStep: originalHandleElectionChoiceStep,
    reset: resetChoice,
    error: choiceError,
  } = useElectionChoices(electionId);

  // --------------------------------------
  // Adımları saran fonksiyonlar
  // --------------------------------------
  const handleElectionInfoStep = async (values: FormValues) => {
    const success = await originalHandleElectionInfoStep(values);
    if (success) {
      // Info step tamamlanınca bir ID döndüğünü varsayalım
      // Hook'unuz election'ı create edip ID'sini döndürüyor olabilir
      if (election && election.id) {
        setElectionId(election.id);
      }
      setStep(1);
    }
    return success;
  };

  const handleElectionAccessStep = async (values: ElectionAccessViewModel) => {
    const success = await originalHandleElectionAccessStep(values);
    if (success) setStep(2);
    return success;
  };

  const handleElectionCandidateStep = async (values: CandidateViewModel[]) => {
    const success = await originalHandleElectionCandidateStep(values);
    if (success) setStep(3);
    return success;
  };

  const handleElectionChoiceStep = async (
    values: ElectionChoiceViewModel[],
  ) => {
    const success = await originalHandleElectionChoiceStep(values);
    if (success) setStep(4);
    return success;
  };

  const resetElectionCreation = () => {
    resetInfo();
    resetAccess();
    resetCandidate();
    resetChoice();
    setStep(0);
    setElectionId(null);
  };

  // --------------------------------------
  // Error & Submitting
  // --------------------------------------

  const submitting = {
    info: infoSubmitting,
    access: accessSubmitting,
    candidate: candidateSubmitting,
    choice: choiceSubmitting,
  };
  const errors = {
    info: infoError,
    access: accessError,
    candidate: candidateError,
    choice: choiceError,
  };
  // --------------------------------------
  // Return
  // --------------------------------------
  return (
    <ElectionCreationContext.Provider
      value={{
        election: election ?? null,
        electionAccess,
        candidates,
        choices,
        dbType,
        setDbType,
        electionId,
        step,
        submitting,
        errors,
        handleElectionInfoStep,
        handleElectionAccessStep,
        handleElectionCandidateStep,
        handleElectionChoiceStep,
        resetElectionCreation,
      }}>
      {children}
    </ElectionCreationContext.Provider>
  );
};

export const useElectionCreationContext = () => {
  const context = useContext(ElectionCreationContext);
  if (!context) {
    throw new Error(
      'useElectionCreationContext must be used within a ElectionCreationProvider',
    );
  }
  return context;
};
