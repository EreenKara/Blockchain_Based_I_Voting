import {ElectionType} from '@enums/election.type';
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
  PublicOrPrivate: undefined;
  DefaultCustom: undefined;
  ElectionInfo: {dbType: 'database' | 'blockchain'};
  ElectionAccess: {accessType: 'public' | 'private'};
  ElectionCandidates: undefined;
  ElectionChoices: undefined;
  ListElections: {type: ElectionType};
  BeCandidate: undefined;
  Elections: undefined;
  SpecificElection: {election: LightElectionViewModel};
  Success: undefined;
  ElectionResult: {election: LightElectionViewModel};
  Vote: undefined;
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
  SpecificElection: {election: LightElectionViewModel};
  ElectionResult: {election: LightElectionViewModel};
};
