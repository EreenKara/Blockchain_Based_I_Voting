import {ElectionType} from '@enums/election.type';
import {NavigatorScreenParams} from '@react-navigation/native';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Error: {
    error: string;
    fromScreen: string;
    toScreen: 'Auth' | 'Main';
  };
  Success: {
    success: string;
    fromScreen: string;
    toScreen: 'Auth' | 'Main';
  };
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
  BlockchainOrDb: undefined;
  ElectionInfo: {dbType: 'database' | 'blockchain'};
  BeCandidate: undefined;
  Elections: undefined;
  SpecificElection: {election: LightElectionViewModel};
  Success: undefined;
  ElectionResult: {election: LightElectionViewModel};
  Shared: NavigatorScreenParams<SharedStackParamList>;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Payment: undefined;
  Settings: undefined;
  AddCard: undefined;
  PersonalInformation: undefined;
  Groups: undefined;
  Group: {group: GroupViewModel};
  CreatedElections: undefined;
  CreateGroup: undefined;
  AddressInformation: undefined;
  Shared: NavigatorScreenParams<SharedStackParamList>;
};

export type SharedStackParamList = {
  ElectionAccess: {accessType: 'public' | 'private'};
  ElectionCandidates: undefined;
  ElectionChoices: undefined;
  PublicOrPrivate: undefined;
  DefaultCustom: undefined;
  SpecificElection: {election: LightElectionViewModel};
  ElectionResult: {election: LightElectionViewModel};
  ListElections: {type: ElectionType};
  Vote: undefined;
};
