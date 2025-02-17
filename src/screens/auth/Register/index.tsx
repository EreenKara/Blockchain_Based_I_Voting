import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AuthStackParamList} from '@navigation/types';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import {registerUserSchema} from '@utility/validations';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

// Form doğrulama şeması

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleRegister = async (values: {
    username: string;
    identityNumber: string;
    phoneNumber: string;
    email: string;
    password: string;
  }) => {
    setVisible(true);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: '',
          identityNumber: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerUserSchema}
        onSubmit={handleRegister}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
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
                onChangeText={handleChange('phoneNumber')}
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
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
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
          </>
        )}
      </Formik>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={styles.snackbar}>
        {errorMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
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
