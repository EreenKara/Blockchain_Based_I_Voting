import {User} from '@entities/user.entity';
import {ElectionScreenType} from '@enums/election.screen.type';
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
  EmailConfirm: {emailOrIdentity: string};
  Deneme: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  SocialMedia: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  CreateElection: undefined;
  ElectionInfo: undefined;
  ListElections: {screenType: ElectionScreenType};
  BeCandidate: undefined;
  Elections: undefined;
  SpecificElection: {election: ElectionViewModel};
  DefaultCustom: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Payment: undefined;
  Settings: undefined;
  AddCard: undefined;
  PersonalInformation: undefined;
  Groups: undefined;
  Group: undefined;
  CreateGroup: undefined;
  CreatedElections: undefined;
  CastedVotes: undefined;
  CandidateElections: undefined;
  AddressInformation: undefined;
  SpecificElection: {election: ElectionViewModel};
};
