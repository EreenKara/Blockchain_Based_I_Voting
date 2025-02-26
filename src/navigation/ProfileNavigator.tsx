import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackParamList} from './types';
import Colors from '@styles/common/colors';
import NavBarTitle from '@shared/navbar_title';
import ProfileScreen from '@screens/profile/Profile';
import SettingsScreen from '@screens/profile/Settings';
import PaymentScreen from '@screens/profile/Payment';
import AddCardScreen from '@screens/profile/Payment/add.card';
import PersonalInformationScreen from '@screens/profile/PersonalInformation';
import GroupsScreen from '@screens/profile/Groups';
import CreatedElectionsScreen from '@screens/profile/CreatedElections';
import CastedVotesScreen from '@screens/profile/CastedVotes';
import CandidateElectionsScreen from '@screens/profile/CandidateElections';
import AddressInformationScreen from '@screens/profile/AddressInformation';
import SpecificElectionScreen from '@screens/shared/SpecificElection';
import CreateGroupScreen from '@screens/profile/CreateGroup';
import GroupScreen from '@screens/profile/Group';
const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => <NavBarTitle />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.getTheme().transition,
        },
      }}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{title: 'Ödeme'}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Ayarlar', headerShown: false}}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{title: 'Kart Ekle'}}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
        options={{title: 'Kişisel Bilgiler'}}
      />
      <Stack.Screen
        name="Groups"
        component={GroupsScreen}
        options={{title: 'Gruplar'}}
      />
      <Stack.Screen
        name="Group"
        component={GroupScreen}
        options={{title: 'Grup'}}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroupScreen}
        options={{title: 'Grup Oluştur'}}
      />
      <Stack.Screen
        name="CreatedElections"
        component={CreatedElectionsScreen}
        options={{title: 'Oluşturulan Seçimler'}}
      />
      <Stack.Screen
        name="CastedVotes"
        component={CastedVotesScreen}
        options={{title: 'Oy Kullanılan Seçimler'}}
      />
      <Stack.Screen
        name="CandidateElections"
        component={CandidateElectionsScreen}
        options={{title: 'İstekli Seçimler'}}
      />
      <Stack.Screen
        name="AddressInformation"
        component={AddressInformationScreen}
        options={{title: 'Adres Bilgileri'}}
      />
      <Stack.Screen
        name="SpecificElection"
        component={SpecificElectionScreen}
        options={{title: 'Seçim'}}
      />
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
