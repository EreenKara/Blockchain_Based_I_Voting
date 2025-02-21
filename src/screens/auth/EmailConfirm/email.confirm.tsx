import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {User} from '@entities/user.entity';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import ButtonComponent from '@components/Button/Button';
import {Snackbar} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UserService} from '@services/backend/concrete/user.service';

type Props = NativeStackScreenProps<AuthStackParamList, 'EmailConfirm'>;

const EmailConfirmScreen: React.FC<Props> = ({navigation, route}) => {
  const {emailOrIdentity} = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const codeLength = 6;
  const userService = new UserService();
  const inputs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const focusPrevious = (index: number) => {
    if (index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const focusNext = (index: number) => {
    if (index < codeLength - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    // Silme işlemi kontrolü
    if (text === '') {
      console.log('calisti');
      newCode[index] = '';
      setCode(newCode);
      focusPrevious(index);
      return;
    }

    // Sadece sayısal değerlere izin ver
    if (!text.match(/^[0-9]+$/)) {
      return;
    }

    // Yapıştırılan metin için kontrol
    if (text.length > 1) {
      // Yapıştırılan metnin her karakterini ayrı input'a yerleştir
      const pastedText = text.slice(0, codeLength - index);
      for (let i = 0; i < pastedText.length; i++) {
        if (index + i < codeLength) {
          newCode[index + i] = pastedText[i];
        }
      }
      setCode(newCode);

      // Son doldurulan input'a focus
      const nextIndex = Math.min(index + pastedText.length, codeLength - 1);
      inputs.current[nextIndex]?.focus();
      return;
    }

    // Tek karakter girişi
    newCode[index] = text;
    setCode(newCode);

    // Otomatik olarak sonraki input'a geç
    if (text !== '') {
      focusNext(index);
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      focusPrevious(index);
    }
  };
  const handleSubmit = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== codeLength) {
      setError(`Lütfen ${codeLength} haneli kodu eksiksiz giriniz.`);
      setVisible(true);
      return;
    }

    try {
      // API çağrısı yapılacak
      const response = await userService.verifyEmail(
        emailOrIdentity,
        verificationCode,
      );
      console.log(response);
      navigation.navigate('Login');
    } catch (err) {
      setError('Doğrulama başarısız oldu. Lütfen tekrar deneyiniz.');
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.keyboardView}
        contentContainerStyle={[{flex: 1}]}>
        <View style={styles.content}>
          <Text style={[CommonStyles.textStyles.title, styles.title]}>
            Doğrulama
          </Text>
          <Text style={[CommonStyles.textStyles.paragraph, styles.description]}>
            {emailOrIdentity} adresine gönderilen{'\n'}
            {codeLength} haneli kodu giriniz
          </Text>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                style={styles.codeInput}
                value={digit}
                onChangeText={text => handleCodeChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <ButtonComponent
            title="Doğrula"
            onPress={handleSubmit}
            style={styles.button}
          />
        </View>
      </KeyboardAwareScrollView>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={styles.snackbar}>
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: styleNumbers.space * 2,
  },
  title: {
    marginBottom: styleNumbers.space,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: styleNumbers.space * 3,
    color: Colors.getTheme().text,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: styleNumbers.space * 3,
    gap: styleNumbers.space,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: styleNumbers.borderRadius,
    borderColor: Colors.getTheme().borderColor,
    textAlign: 'center',
    fontSize: styleNumbers.textSize * 1.5,
    color: Colors.getTheme().text,
    backgroundColor: Colors.getTheme().background,
  },
  button: {
    width: '100%',
  },
  snackbar: {
    backgroundColor: Colors.getTheme().error,
  },
});

export default EmailConfirmScreen;
