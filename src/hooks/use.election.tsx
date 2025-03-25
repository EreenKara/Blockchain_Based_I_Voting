import {useCallback, useEffect, useState} from 'react';
import {useSearchContext} from '@contexts/search.context';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {ElectionType} from '@enums/election.type';
import {useGetElectionsFunction} from '../screens/shared/ListElections/election.hook';

export const useElection = (type: ElectionType) => {
  const [elections, setElections] = useState<LightElectionViewModel[]>([]);
  const [loading, setLoading] = useState(false);
  const {search} = useSearchContext();
  const getElectionsFunction = useGetElectionsFunction(type);

  const fetchElections = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getElectionsFunction(search.city || 'İstanbul');
      setElections(data);
    } catch (error) {
      console.error('Error fetching elections:', error);
    } finally {
      setLoading(false);
    }
  }, [search.city]);

  useEffect(() => {
    fetchElections();
  }, [search.city]);

  return {
    elections,
    loading,
    fetchElections,
  };
};
