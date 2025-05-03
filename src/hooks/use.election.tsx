import {useCallback, useEffect, useState} from 'react';
import {useSearchContext} from '@contexts/search.context';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {ElectionType} from '@enums/election.type';
import {useGetElectionsFunction} from '../screens/shared/ListElections/election.hook';
import {useAsync} from './Modular/use.async';
import {ElectionSearchObject} from '@services/backend/concrete/election.service';
import {electionService} from '@services/backend/concrete/service.container.instances';
export const useElection = (type: ElectionType) => {
  const {search} = useSearchContext();
  const getElectionsFunction = useGetElectionsFunction(type);
  const {
    execute: fetchElections,
    data: elections,
    loading,
  } = useAsync<LightElectionViewModel[]>(getElectionsFunction);

  useEffect(() => {
    fetchElections({city: search.city});
  }, []);
  useEffect(() => {
    if (type !== ElectionType.Popular) {
      fetchElections({city: search.city});
    }
  }, [search.city]);

  return {
    elections,
    loading,
    fetchElections,
  };
};
