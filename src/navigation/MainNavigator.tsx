import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@navigation/types';
import HomeNavigator from '@navigation/HomeNavigator';
import ProfileScreen from '@screens/profile/Profile';
import SocialMediaScreen from '@screens/social/SocialMedia';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="SocialMedia" component={SocialMediaScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
