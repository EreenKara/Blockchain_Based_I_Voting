import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import ButtonComponent from '@components/Button/Button';
import TextInputComponent from '@components/TextInput/text.input';
type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setMessage('Email adresi gereklidir');
      setVisible(true);
      return;
    }

    if (!email.includes('@')) {
      setMessage('Geçerli bir email adresi giriniz');
      setVisible(true);
      return;
    }

    // İleride API entegrasyonu için yer tutucu
    setMessage('Şifre sıfırlama bağlantısı gönderildi');
    setVisible(true);

    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Şifrenizi sıfırlamak için kayıtlı email adresinizi giriniz. Size şifre
        sıfırlama bağlantısı göndereceğiz.
      </Text>
      <View style={styles.viewTextInput}>
        <TextInputComponent
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <ButtonComponent
        title="Şifre Sıfırlama Bağlantısı Gönder"
        onPress={handleResetPassword}
        style={styles.button}
      />
      <ButtonComponent
        title="Giriş Ekranına Dön"
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={styles.snackbar}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    padding: styleNumbers.space,
  },
  description: {
    ...CommonStyles.textStyles.paragraph,
    marginBottom: styleNumbers.space,
    color: Colors.getTheme().text,
  },
  input: {
    marginBottom: styleNumbers.spaceLittle,
  },
  button: {
    marginTop: styleNumbers.spaceLittle,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
  viewTextInput: {
    marginTop: styleNumbers.space * 3,
  },
});

export default ForgotPasswordScreen;
