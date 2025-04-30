import {useCallback, useEffect, useState} from 'react';
import {useSearchContext} from '@contexts/search.context';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import {ElectionType} from '@enums/election.type';
import {useGetElectionsFunction} from '../screens/shared/ListElections/election.hook';
import {useAsync} from './Modular/use.async';

export const useElection = (type: ElectionType) => {
  const {search} = useSearchContext();
  const getElectionsFunction = useGetElectionsFunction(type);
  const {
    execute: fetchElections,
    data: elections,
    loading,
  } = useAsync<LightElectionViewModel[]>(getElectionsFunction);

  useEffect(() => {
    fetchElections(search.city);
  }, [search.city]);

  return {
    elections,
    loading,
    fetchElections,
  };
};
