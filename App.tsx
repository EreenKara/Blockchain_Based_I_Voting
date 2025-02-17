import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {ActivityIndicator, View, Text} from 'react-native';
import {RootStackParamList} from '@navigation/types';
import AuthNavigator from '@navigation/AuthNavigator';
import MainNavigator from '@navigation/MainNavigator';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import ActivityIndicatorComponent from './src/shared/activity.indicator';
import ErrorScreenComponent from './src/shared/error.screen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  username: '',
  setUsername: () => {},
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = React.useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      username,
      setUsername,
    }),
    [isAuthenticated, username],
  );

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
    <AuthContext.Provider value={authContext}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {!isAuthenticated ? (
              <Stack.Screen name="Auth" component={AuthNavigator} />
            ) : (
              <Stack.Screen name="Main" component={MainNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default App;
