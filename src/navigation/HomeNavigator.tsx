import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from './types';
import {HomeScreen} from '@screens/home/index';
import BlockchainOrDbScreen from '@screens/home/CreateElection/blockchain.or.db';
import {ElectionInfoScreen} from '@screens/home/index';
import {BeCandidateScreen} from '@screens/home/index';
import {ElectionsScreen} from '@screens/home/index';
import {SpecificElectionScreen} from '@screens/home/index';
import Colors from '@styles/common/colors';
import NavBarTitle from '@shared/navbar_title';
import DefaultCustomScreen from '@screens/home/CreateElection/default.or.custom';
import ListElectionsScreen from '@screens/shared/ListElections';
import ElectionAccessScreen from '@screens/home/ElectionAccess';
import PublicOrPrivateScreen from '@screens/home/CreateElection/public.or.private';
import ElectionCandidatesScreen from '@screens/home/ElectionCandidates';
import ElectionChoicesScreen from '@screens/home/ElectionChoices';
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
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
        name="BlockchainOrDb"
        component={BlockchainOrDbScreen}
        options={{title: 'Seçim Oluştur'}}
      />
      <Stack.Screen
        name="ElectionCandidates"
        component={ElectionCandidatesScreen}
        options={{title: 'Adaylar'}}
      />
      <Stack.Screen
        name="ElectionChoices"
        component={ElectionChoicesScreen}
        options={{title: 'Seçim Seçenekleri'}}
      />
      <Stack.Screen
        name="PublicOrPrivate"
        component={PublicOrPrivateScreen}
        options={{title: 'Seçim Erişim Bilgileri'}}
      />
      <Stack.Screen
        name="ElectionInfo"
        component={ElectionInfoScreen}
        options={{title: 'Seçim Bilgileri'}}
      />
      <Stack.Screen
        name="ElectionAccess"
        component={ElectionAccessScreen}
        options={{title: 'Seçim Erişim Bilgileri'}}
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
      <Stack.Screen
        name="DefaultCustom"
        component={DefaultCustomScreen}
        options={{title: 'Varsayılan veya Özel'}}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
