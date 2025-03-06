import {useState} from 'react';
import {ElectionChoiceViewModel} from '@viewmodels/election.choice.viewmodel';

const useElectionChoices = () => {
  const [electionChoices, setElectionChoices] = useState<
    ElectionChoiceViewModel[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
};
