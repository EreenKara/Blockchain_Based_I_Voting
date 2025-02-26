import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList, ProfileStackParamList} from '@navigation/types';

type ElectionsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Elections'
>;

type SpecificElectionScreenProps = NativeStackScreenProps<
  HomeStackParamList | ProfileStackParamList,
  'SpecificElection'
>;

export type {ElectionsScreenProps, SpecificElectionScreenProps};
