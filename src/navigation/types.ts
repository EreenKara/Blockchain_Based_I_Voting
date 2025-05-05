import {ElectionType} from '@enums/election.type';
import {NavigatorScreenParams} from '@react-navigation/native';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
import LightGroupViewModel from '@viewmodels/light.group.viewmodel';

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
  ElectionInfo: {electionType: 'database' | 'blockchain'};
  BeCandidate: undefined;
  Elections: undefined;
  PrivateElections: undefined;
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
  Group: {group: LightGroupViewModel};
  CreatedElections: undefined;
  CreateGroup: undefined;
  AddressInformation: undefined;
  AddressChange: {address: AddressViewModel | null};
  Shared: NavigatorScreenParams<SharedStackParamList>;
};

export type SharedStackParamList = {
  ElectionAccess: {accessType: 'public' | 'private'; electionId: string | null};
  ElectionCandidates: {electionId: string | null};
  ElectionChoices: {electionId: string | null};
  PublicOrPrivate: {electionId: string | null};
  DefaultCustom: {electionId: string | null};
  SpecificElection: {election: LightElectionViewModel};
  ElectionResult: {election: LightElectionViewModel};
  ListElections: {type: ElectionType};
  Vote: undefined;
};
