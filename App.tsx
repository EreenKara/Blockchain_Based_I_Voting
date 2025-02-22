import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {View} from 'react-native';
import {RootStackParamList} from '@navigation/types';
import AuthNavigator from '@navigation/AuthNavigator';
import MainNavigator from '@navigation/MainNavigator';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import ActivityIndicatorComponent from './src/shared/activity.indicator';
import ErrorScreenComponent from './src/shared/error.screen';
import {AuthProvider} from '@contexts/index';
import {UserProvider} from '@contexts/index';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <View style={CommonStyles.viewStyles.centerContainer}>
        <ActivityIndicatorComponent fullScreen={true} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          CommonStyles.viewStyles.centerContainer,
          {padding: styleNumbers.space},
        ]}>
        <ErrorScreenComponent message={'Hata:' + error} fromScreen={'App'} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <UserProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Auth"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Auth" component={AuthNavigator} />
              <Stack.Screen name="Main" component={MainNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
