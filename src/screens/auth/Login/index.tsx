import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {Button, Snackbar, Checkbox} from 'react-native-paper';
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  AuthStackParamList,
  HomeStackParamList,
  RootStackParamList,
} from '@navigation/types';
import {AuthContext} from '../../../../App';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import {object} from 'yup';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;
// Form doğrulama şeması
const loginDenemeUserScheme = object({});

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const homeNavigation = useNavigation<RootProps>();
  const {setIsAuthenticated, setUsername: setContextUsername} =
    useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleLogin = async (values: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setVisible(true);
    setMessage('Giriş yapılıyor...');
    setIsAuthenticated(true); // BUNU KOYMADAN NAVIGA ETMIYOR!!
    homeNavigation.navigate('Main');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        CommonStyles.viewStyles.container,
        CommonStyles.safearea,
      ]}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={loginDenemeUserScheme}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <View style={styles.viewText}>
              <TextInputComponent
                label="Kullanıcı Adı"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={
                  touched.username && errors.username
                    ? errors.username
                    : undefined
                }
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.viewText}>
              <TextInputComponent
                label="Şifre"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
                secureTextEntry
                style={styles.input}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={values.rememberMe ? 'checked' : 'unchecked'}
                onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
              />
              <Text style={styles.checkboxLabel}>Beni Hatırla</Text>
            </View>
            <ButtonComponent
              title="Giriş Yap"
              onPress={handleSubmit}
              style={styles.button}
            />
            <Button
              mode="text"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.button}>
              Şifremi Unuttum
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Register')}
              style={styles.button}>
              Hesabın yok mu? Kayıt Ol
            </Button>
          </>
        )}
      </Formik>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={styles.snackbar}>
        {message}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: styleNumbers.spaceLarge,
  },
  input: {
    marginBottom: styleNumbers.space,
  },
  viewText: {
    marginTop: styleNumbers.spaceLarge,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: styleNumbers.space,
  },
  checkboxLabel: {
    ...CommonStyles.textStyles.paragraph,
    marginLeft: styleNumbers.spaceLittle,
  },
  button: {
    ...CommonStyles.textStyles.paragraph,
    marginTop: styleNumbers.spaceLittle,
  },
  snackbar: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: Colors.getTheme().button,
  },
});

export default LoginScreen;
