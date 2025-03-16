import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {HomeStackParamList} from './types';
import {HomeScreen} from '@screens/home/index';
import BlockchainOrDbScreen from '@screens/home/CreateElection/blockchain.or.db';
import {ElectionInfoScreen} from '@screens/home/index';
import {BeCandidateScreen} from '@screens/home/index';
import {ElectionsScreen} from '@screens/home/index';
import {SpecificElectionScreen} from '@screens/home/index';
import Colors from '@styles/common/colors';
import NavBarTitle from '@screens/shared/navbar_title';
import DefaultCustomScreen from '@screens/home/CreateElection/default.or.custom';
import ListElectionsScreen from '@screens/shared/ListElections';
import ElectionAccessScreen from '@screens/home/ElectionAccess';
import PublicOrPrivateScreen from '@screens/home/CreateElection/public.or.private';
import ElectionCandidatesScreen from '@screens/home/ElectionCandidates';
import ElectionChoicesScreen from '@screens/home/ElectionChoices';
import ButtonComponent from '@components/Button/Button';
import DiscardButtonComponent from '@screens/shared/discard.buttont';
import {useElectionCreationContext} from '@contexts/index';
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  const {resetElectionCreation} = useElectionCreationContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => <NavBarTitle />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.getTheme().bar,
        },
      }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{title: 'Ana Sayfa'}}
      />
      <Stack.Screen
        name="ElectionCandidates"
        component={ElectionCandidatesScreen}
        options={navigation => ({
          title: 'Adaylar',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                navigation.navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ElectionChoices"
        component={ElectionChoicesScreen}
        options={navigation => ({
          title: 'Seçim Seçenekleri',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                navigation.navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ElectionInfo"
        component={ElectionInfoScreen}
        options={navigation => ({
          title: 'Seçim Bilgileri',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                navigation.navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ElectionAccess"
        component={ElectionAccessScreen}
        options={navigation => ({
          title: 'Seçim Erişim Bilgileri',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                navigation.navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="BlockchainOrDb"
        component={BlockchainOrDbScreen}
        options={navigation => ({
          title: 'Blockchain Or Database',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                navigation.navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PublicOrPrivate"
        component={PublicOrPrivateScreen}
        options={navigation => ({
          title: 'Public Or Private',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                navigation.navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DefaultCustom"
        component={DefaultCustomScreen}
        options={navigation => ({
          title: 'Varsayılan veya Özel',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                navigation.navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Elections"
        component={ElectionsScreen}
        options={{title: 'Seçimler'}}
      />
      <Stack.Screen
        name="SpecificElection"
        component={SpecificElectionScreen}
        options={{title: 'Seçim'}}
      />
      <Stack.Screen
        name="ListElections"
        component={ListElectionsScreen}
        options={{title: 'Seçimler'}}
      />
      <Stack.Screen
        name="BeCandidate"
        component={BeCandidateScreen}
        options={{title: 'Aday Ol'}}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
