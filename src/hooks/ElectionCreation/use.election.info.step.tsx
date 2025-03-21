import {FormValues} from '@screens/home/ElectionInfo';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {useEffect, useState} from 'react';
import {electionService} from '@services/backend/concrete/service.container.instances';

const useElectionInfoStep = () => {
  const [election, setElection] = useState<ElectionViewModel | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dbType, setDbType] = useState<'database' | 'blockchain' | null>(null);

  const handleElectionInfoStep = async (
    values: FormValues,
  ): Promise<{success: boolean; error: string | null}> => {
    try {
      setSubmitting(true);
      setError(null);
      let election: ElectionViewModel = {
        id: '',
        name: values.title,
        description: values.description,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        image: values.image?.base64 || '',
        color: values.color,
        dbType:
          dbType ??
          (() => {
            throw new Error('Db type is required');
          })(),
      };
      const response = await electionService.postElectionInfo(election);
      if (response) {
        console.log('Election created:', response);
        setElection(response);
        setSubmitting(false);
        return {success: true, error: null};
      } else {
        setSubmitting(false);
        setError('Election creation failed. Some fields are not valid.');
        return {
          success: false,
          error: 'Election creation failed. Some fields are not valid.',
        };
      }
    } catch (error: any) {
      console.log('Election creation error:', error);
      setError(error.message);
      setSubmitting(false);
      return {success: false, error: 'Internet veya server problemi.'};
    }
  };
  const reset = () => {
    setElection(null);
    setDbType(null);
    setError(null);
    setSubmitting(false);
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
