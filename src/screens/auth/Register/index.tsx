import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {AuthStackParamList} from '@navigation/types';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import {bosSchema, registerUserSchema} from '@utility/validations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UserService} from '@services/backend/concrete/user.service';
import {User} from '@entities/user.entity';
type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

// Form doğrulama şeması

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  interface RegisterFormValues {
    username: string;
    name: string;
    surname: string;
    identityNumber: string;
    phoneNumber: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
  const userService = new UserService();
  const [visible, setVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');

  const handleRegister = async (
    values: RegisterFormValues,
    formikHelpers: FormikHelpers<RegisterFormValues>,
  ) => {
    formikHelpers.setSubmitting(true);
    const user: User = new User({
      username: values.username,
      name: values.name,
      surname: values.surname,
      identityNumber: values.identityNumber,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
    });
    try {
      const message = await userService.register(user);
      setErrorMsg(message);
      setVisible(true);
      navigation.navigate('EmailConfirm', {emailOrIdentity: user.email});
    } catch (error: any) {
      setSubmitError(`${error.message}`);
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Formik
        initialValues={{
          username: '',
          name: '',
          surname: '',
          identityNumber: '',
          phoneNumber: '',
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={registerUserSchema}
        onSubmit={handleRegister}>
        {({
          setErrors,
          setFieldError,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAwareScrollView style={styles.container}>
            {submitError && (
              <Text
                style={[CommonStyles.textStyles.error, {textAlign: 'center'}]}>
                {submitError}
              </Text>
            )}
            <View style={styles.viewTextInput}>
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
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInputComponent
                label="Ad"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name ? errors.name : undefined}
                style={styles.input}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInputComponent
                label="Soyad"
                value={values.surname}
                onChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                error={
                  touched.surname && errors.surname ? errors.surname : undefined
                }
                style={styles.input}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInputComponent
                label="Kimlik Numarası"
                value={values.identityNumber}
                onChangeText={handleChange('identityNumber')}
                onBlur={handleBlur('identityNumber')}
                error={
                  touched.identityNumber && errors.identityNumber
                    ? errors.identityNumber
                    : undefined
                }
                keyboardType="numeric"
                maxLength={11}
                style={styles.input}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInputComponent
                label="Telefon Numarası"
                value={values.phoneNumber}
                onChangeText={value => {
                  setFieldValue('phoneNumber', value);
                }}
                onBlur={handleBlur('phoneNumber')}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInputComponent
                label="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? errors.email : undefined}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            <View style={styles.viewTextInput}>
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
            <View style={styles.viewTextInput}>
              <TextInputComponent
                label="Şifre Tekrar"
                value={values.passwordConfirm}
                onChangeText={handleChange('passwordConfirm')}
                onBlur={() => {
                  handleBlur('passwordConfirm');
                  //if (values.password !== values.passwordConfirm) {
                  //  setFieldError('passwordConfirm', 'Şifreler eşleşmiyor');
                  //}
                }}
                error={
                  touched.passwordConfirm && errors.passwordConfirm
                    ? errors.passwordConfirm
                    : undefined
                }
                secureTextEntry
                style={styles.input}
              />
            </View>
            <ButtonComponent
              title="Kayıt Ol"
              onPress={handleSubmit}
              style={styles.button}
            />
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}>
              Zaten hesabın var mı? Giriş Yap
            </Button>
          </KeyboardAwareScrollView>
        )}
      </Formik>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={styles.snackbar}>
        {errorMsg}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    flexGrow: 1,
  },
  input: {
    marginBottom: styleNumbers.space,
    ...CommonStyles.textStyles.paragraph,
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
  viewTextInput: {
    marginTop: styleNumbers.spaceLarge,
  },
});

export default RegisterScreen;
