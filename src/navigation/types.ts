import {ElectionViewModel} from '@viewmodels/election.viewmodel';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  SocialMedia: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  CreateElection: undefined;
  PastElections: {cityId: number; cityName: string};
  CurrentElections: {cityId: number; cityName: string};
  UpcomingElections: {cityId: number; cityName: string};
  BeCandidate: undefined;
  Elections: undefined;
  SpecificElection: {election: ElectionViewModel};
};
