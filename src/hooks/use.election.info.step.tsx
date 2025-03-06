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

  const handleElectionInfoStep = async (values: FormValues) => {
    const electionService = ServiceContainer.getService(
      ServiceType.ElectionService,
    ) as ElectionService;
    try {
      setSubmitting(true);
      setElection({
        id: '',
        name: values.title,
        description: values.description,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        image: values.image?.base64 || '',
        color: values.color,
      });
      if (election) {
        const response = await electionService.postElectionInfo(election);
        election.id = response.id;
      }
    } catch (error: any) {
      setSubmitting(false);
      setElection(null);
    } finally {
      setSubmitting(false);
    }
  };

  return {election, handleElectionInfoStep, submitting, error};
};

export default useElectionInfoStep;
