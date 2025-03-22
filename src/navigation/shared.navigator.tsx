import ElectionAccessScreen from '@screens/home/ElectionAccess';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {HomeStackParamList, SharedStackParamList} from './types';
import React from 'react';
import PublicOrPrivateScreen from '@screens/home/CreateElection/public.or.private';
import {useElectionCreationContext} from '@contexts/election.creation.context';
import DiscardButtonComponent from '@screens/shared/discard.buttont';
import DefaultCustomScreen from '@screens/home/CreateElection/default.or.custom';
import ElectionCandidatesScreen from '@screens/home/ElectionCandidates';
import ElectionChoicesScreen from '@screens/home/ElectionChoices';
import {useNavigation} from '@react-navigation/native';
import Colors from '@styles/common/colors';
import NavBarTitle from '@screens/shared/navbar_title';
import {View} from 'react-native';
import ElectionResultScreen from '@screens/shared/ElectionResult';
import SpecificElectionScreen from '@screens/shared/SpecificElection';
import ListElectionsScreen from '@screens/shared/ListElections';
import ButtonComponent from '@components/Button/Button';

const Stack = createNativeStackNavigator<SharedStackParamList>();

const SharedNavigator: React.FC = () => {
  const {resetElectionCreation} = useElectionCreationContext();
  const homeNavigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => <NavBarTitle />,
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: Colors.getTheme().bar},
      }}>
      <Stack.Screen
        name="ElectionAccess"
        component={ElectionAccessScreen}
        options={navigation => ({
          title: 'Seçim Erişimi',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                homeNavigation.reset({
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
                homeNavigation.reset({
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
                homeNavigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
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
                homeNavigation.reset({
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
        options={() => ({
          title: 'Seçim Seçenekleri',
          headerRight: () => (
            <DiscardButtonComponent
              onPress={() => {
                resetElectionCreation();
                homeNavigation.reset({
                  index: 0,
                  routes: [{name: 'HomeMain'}],
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="SpecificElection"
        component={SpecificElectionScreen}
        options={{title: 'Seçim'}}
      />
      <Stack.Screen
        name="ElectionResult"
        component={ElectionResultScreen}
        options={{title: 'Seçim Sonucu'}}
      />
      <Stack.Screen
        name="ListElections"
        component={ListElectionsScreen}
        options={{title: 'Seçimler'}}
      />
    </Stack.Navigator>
  );
};

export default SharedNavigator;
