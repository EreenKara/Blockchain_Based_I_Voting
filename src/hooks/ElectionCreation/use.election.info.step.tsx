import {PreventRemoveContext} from '@react-navigation/native';
import {FormValues} from '@screens/home/ElectionInfo';
import ElectionService from '@services/backend/concrete/election.service';
import {ServiceContainer} from '@services/backend/concrete/service.container';
import {ServiceType} from '@services/backend/concrete/service.container';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {useEffect, useState} from 'react';

const useElectionInfoStep = () => {
  const [election, setElection] = useState<ElectionViewModel | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dbType, setDbType] = useState<'database' | 'blockchain' | null>(null);

  const handleElectionInfoStep = async (values: FormValues) => {
    const electionService = ServiceContainer.getService(
      ServiceType.ElectionService,
    ) as ElectionService;
    try {
      setSubmitting(true);

      setError(null);

      setSubmitting(true);
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
        setElection(response);
        setSubmitting(false);
        return true;
      } else {
        setSubmitting(false);
        setError('Election creation failed. Some fields are not valid.');
        return false;
      }
    } catch (error: any) {
      setError(error.message);
      setSubmitting(false);
      return false;
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
