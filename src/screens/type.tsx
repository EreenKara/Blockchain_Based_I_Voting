import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';

type ElectionsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Elections'
>;

type SpecificElectionScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'SpecificElection'
>;

export type {ElectionsScreenProps, SpecificElectionScreenProps};
