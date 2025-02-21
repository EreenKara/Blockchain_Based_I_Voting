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
import {AuthStackParamList, RootStackParamList} from '@navigation/types';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import {bosSchema, loginUserSchema} from '@utility/validations';
import {UserService} from '@services/backend/concrete/user.service';
import {useAuth} from '@contexts/index';
import ActivityIndicatorComponent from '@shared/activity.indicator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;
// Form doğrulama şeması

const LoginScreen: React.FC<Props> = ({navigation}) => {
  interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  const homeNavigation = useNavigation<RootProps>();
  const [loading, setLoading] = React.useState(false);
  const {login, rememberUser, getUser} = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');
  const userService = new UserService();
  const [initialValues, setInitialValues] = React.useState<LoginFormValues>({
    email: '',
    password: '',
    rememberMe: false,
  });
  useEffect(() => {
    setLoading(true);
    getUser().then(user => {
      initialValues.email = user || '';
      setLoading(false);
    });
  }, []);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const token = await userService.login({
        email: values.email,
        password: values.password,
      });
      if (values.rememberMe) {
        rememberUser(values.email);
      }
      login(token);
      setVisible(true);
      setMessage('Giris basarili');
      homeNavigation.navigate('Main');
    } catch (error: any) {
      setSubmitError(error.message);
    }
  };
  if (loading) {
    return <ActivityIndicatorComponent />;
  }
  return (
    <SafeAreaView
      style={[
        styles.container,
        CommonStyles.viewStyles.container,
        CommonStyles.safearea,
      ]}>
      <Formik
        initialValues={initialValues}
        validationSchema={bosSchema}
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
            {submitError && (
              <Text
                style={[CommonStyles.textStyles.error, {textAlign: 'center'}]}>
                {submitError}
              </Text>
            )}
            <View style={styles.viewText}>
              <TextInputComponent
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? errors.email : undefined}
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
              labelStyle={[
                CommonStyles.textStyles.paragraph,
                {color: Colors.getTheme().button},
              ]}
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.button}>
              Şifremi Unuttum
            </Button>
            <Button
              labelStyle={[
                CommonStyles.textStyles.paragraph,
                {color: Colors.getTheme().button},
              ]}
              onPress={() => navigation.navigate('Register')}
              style={styles.button}>
              Hesabın yok mu? Kayıt Ol
            </Button>
            <Button
              labelStyle={[
                CommonStyles.textStyles.paragraph,
                {color: Colors.getTheme().button},
              ]}
              onPress={() =>
                navigation.navigate('EmailConfirm', {
                  emailOrIdentity: values.email,
                })
              }
              style={styles.button}>
              Dogrulama sayfasina git
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
