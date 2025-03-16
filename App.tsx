import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {View} from 'react-native';
import {RootStackParamList} from '@navigation/types';
import AuthNavigator from '@navigation/AuthNavigator';
import MainNavigator from '@navigation/MainNavigator';
import CommonStyles from '@styles/common/commonStyles';
import ActivityIndicatorComponent from '@screens/shared/activity.indicator';
import ErrorScreenComponent from '@screens/shared/error.screen';
import {AuthProvider, ElectionCreationProvider} from '@contexts/index';
import {UserProfileProvider} from '@contexts/index';
import {SearchProvider} from '@contexts/index';
import ErrorScreen from '@screens/shared/Error/error.screen';
import SuccessScreen from '@screens/shared/Success/success.screen';
import {ThemeProvider} from '@contexts/index';
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={CommonStyles.viewStyles.centerContainer}>
        <ActivityIndicatorComponent fullScreen={true} />
      </View>
    );
  }

  return (
    <ThemeProvider colorScheme="light">
      <AuthProvider>
        <UserProfileProvider>
          <ElectionCreationProvider>
            <SearchProvider>
              <PaperProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName="Auth"
                    screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                    <Stack.Screen name="Main" component={MainNavigator} />
                    <Stack.Screen name="Error" component={ErrorScreen} />
                    <Stack.Screen name="Success" component={SuccessScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </PaperProvider>
            </SearchProvider>
          </ElectionCreationProvider>
        </UserProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
