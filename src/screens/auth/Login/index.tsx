import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {Button, Snackbar, Checkbox} from 'react-native-paper';
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import {AuthStackParamList, RootStackParamList} from '@navigation/types';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
import styles from './index.style';
import {bosSchema, loginUserSchema} from '@utility/validations';
import ActivityIndicatorComponent from '@shared/activity.indicator';
import {useAuth} from '@hooks/use.auth';
import {useNavigation} from '@react-navigation/native';
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const homeNavigation = useNavigation<RootProps>();
  const {
    loading,
    visible,
    setVisible,
    submitError,
    message,
    submitLogin,
    emailOrIdentity,
  } = useAuth(true);

  const handleLogin = async (values: {
    emailOrIdentity: string;
    password: string;
    rememberMe: boolean;
  }) => {
    console.log('handleLogin', values);
    const result = await submitLogin(values);
    if (result === true) {
      homeNavigation.navigate('Main');
    }
  };

  const initialValues = {
    emailOrIdentity: emailOrIdentity,
    password: '',
    rememberMe: false,
  };

  if (loading) {
    return <ActivityIndicatorComponent />;
  }
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@assets/images/nav_logo.png')}
          style={styles.logo}
        />
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={loginUserSchema}
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
            {submitError && <Text style={styles.errorText}>{submitError}</Text>}
            <View style={styles.viewText}>
              <TextInputComponent
                label="Email"
                value={values.emailOrIdentity}
                onChangeText={handleChange('emailOrIdentity')}
                onBlur={handleBlur('emailOrIdentity')}
                error={
                  touched.emailOrIdentity && errors.emailOrIdentity
                    ? errors.emailOrIdentity
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
              labelStyle={styles.buttonLabel}
              onPress={() => navigation.navigate('Register')}
              style={styles.button}>
              Şifremi Unuttum
            </Button>
            <Button
              labelStyle={styles.buttonLabel}
              onPress={() => navigation.navigate('Register')}
              style={styles.button}>
              Hesabın yok mu? Kayıt Ol
            </Button>
            <Button
              labelStyle={styles.buttonLabel}
              onPress={() =>
                navigation.navigate('EmailConfirm', {
                  emailOrIdentity: values.emailOrIdentity,
                })
              }
              style={styles.button}>
              Dogrulama sayfasina git
            </Button>
            <ButtonComponent
              title="Deneme sayfasina git"
              onPress={() => navigation.navigate('Deneme')}
              style={styles.button}
            />
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

export default LoginScreen;
