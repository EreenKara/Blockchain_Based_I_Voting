import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {SehirViewModel} from '@viewmodels/sehir.viewmodel';

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
  PastElections: {sehir: SehirViewModel};
  CurrentElections: {sehir: SehirViewModel};
  UpcomingElections: {sehir: SehirViewModel};
  BeCandidate: undefined;
  Elections: undefined;
  SpecificElection: {sehir: SehirViewModel; election: ElectionViewModel};
};
