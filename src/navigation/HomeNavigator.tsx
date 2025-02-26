import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from './types';
import {HomeScreen} from '@screens/home/index';
import {CreateElectionScreen} from '@screens/home/index';
import {ElectionInfoScreen} from '@screens/home/index';
import {BeCandidateScreen} from '@screens/home/index';
import {ElectionsScreen} from '@screens/home/index';
import {SpecificElectionScreen} from '@screens/home/index';
import Colors from '@styles/common/colors';
import NavBarTitle from '@shared/navbar_title';
import DefaultCustomScreen from '@screens/home/DefaultCustom';
import ListElectionsScreen from '@screens/shared/ListElections';
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
        name="CreateElection"
        component={CreateElectionScreen}
        options={{title: 'Seçim Oluştur'}}
      />
      <Stack.Screen
        name="ElectionInfo"
        component={ElectionInfoScreen}
        options={{title: 'Seçim Bilgileri'}}
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
