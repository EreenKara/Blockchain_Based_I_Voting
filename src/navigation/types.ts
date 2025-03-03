import {ElectionType} from '@enums/election.type';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';

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
  ListElections: {type: ElectionType};
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
  ListElections: {type: ElectionType};
  Group: {group: GroupViewModel};
  CreateGroup: undefined;
  CreatedElections: undefined;
  CastedVotes: undefined;
  CandidateElections: undefined;
  AddressInformation: undefined;
  SpecificElection: {election: ElectionViewModel};
};
