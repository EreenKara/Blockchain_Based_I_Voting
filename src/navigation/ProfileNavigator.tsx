import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList, ProfileStackParamList} from './types';
import {HomeScreen} from '@screens/home/index';
import {CreateElectionScreen} from '@screens/home/index';
import {ElectionInfoScreen} from '@screens/home/index';
import {PastElectionsScreen} from '@screens/home/index';
import {CurrentElectionsScreen} from '@screens/home/index';
import {UpComingElectionsScreen} from '@screens/home/index';
import {BeCandidateScreen} from '@screens/home/index';
import {ElectionsScreen} from '@screens/home/index';
import {SpecificElectionScreen} from '@screens/home/index';
import Colors from '@styles/common/colors';
import NavBarTitle from '@shared/navbar_title';
import ProfileScreen from '@screens/profile/Profile';
import SettingsScreen from '@screens/profile/Settings';
import PaymentScreen from '@screens/profile/Payment';
import AddCardScreen from '@screens/profile/Payment/add.card';
const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerRight: () => <NavBarTitle />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.getTheme().transition,
        },
      }}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{title: 'Profil'}}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{title: 'Ödeme'}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Ayarlar'}}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{title: 'Kart Ekle'}}
      />
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
