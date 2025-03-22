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
import NavBarTitle from '@screens/shared/navbar_title';
import DiscardButtonComponent from '@screens/shared/discard.buttont';
import {useElectionCreationContext, useThemeColors} from '@contexts/index';
import ElectionResultScreen from '@screens/shared/ElectionResult';
import VoteScreen from '@screens/home/Vote';
import SharedNavigator from './shared.navigator';
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  const {resetElectionCreation} = useElectionCreationContext();
  const {colors} = useThemeColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => <NavBarTitle />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.bar,
        },
      }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{title: 'Ana Sayfa'}}
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
        name="Shared"
        component={SharedNavigator}
        options={{headerShown: false}}
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
        name="BeCandidate"
        component={BeCandidateScreen}
        options={{title: 'Aday Ol'}}
      />
      <Stack.Screen
        name="ElectionResult"
        component={ElectionResultScreen}
        options={{title: 'Seçim Sonucu'}}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
