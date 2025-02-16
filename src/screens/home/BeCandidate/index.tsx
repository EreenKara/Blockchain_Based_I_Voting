import React, {useState, useContext} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  TextInput,
  Button,
  Snackbar,
  Title,
  Card,
  Paragraph,
} from 'react-native-paper';
import {logService} from '@services/log/LogService';
import {AuthContext} from '../../../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
type Props = NativeStackScreenProps<HomeStackParamList, 'BeCandidate'>;

const BeCandidateScreen: React.FC<Props> = ({navigation}) => {
  const {username} = useContext(AuthContext);
  const [biography, setBiography] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!biography || biography.length < 100) {
      setMessage('Biyografi en az 100 karakter olmalıdır');
      setVisible(true);
      return;
    }

    try {
      const success = await logService.becomeCandidate(username, biography);

      if (success) {
        setMessage('Adaylık başvurunuz alınmıştır');
        setBiography('');
        setTimeout(() => {
          navigation.navigate('HomeMain');
        }, 2000);
      } else {
        setMessage(
          'Adaylık başvurusu yapılırken bir hata oluştu veya zaten adaysınız',
        );
      }
      setVisible(true);
    } catch (error) {
      setMessage('Bir hata oluştu');
      setVisible(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={CommonStyles.textStyles.title}>
            Adaylık Kriterleri
          </Title>
          <Paragraph style={CommonStyles.textStyles.paragraph}>
            - En az 18 yaşında olmalısınız{'\n'}- Sabıka kaydınız olmamalı{'\n'}
            - Biyografiniz en az 100 karakter olmalı{'\n'}- Daha önce aday
            olmamış olmalısınız
          </Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.viewTextInput}>
        <TextInputComponent
          label="Biyografi"
          value={biography}
          onChangeText={setBiography}
          multiline
          numberOfLines={8}
          style={styles.input}
          placeholder="Kendinizi tanıtın..."
        />
      </View>

      <ButtonComponent
        title="Aday Ol"
        onPress={handleSubmit}
        style={styles.button}
      />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={styles.snackbar}>
        {message}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
  },
  infoCard: {
    margin: styleNumbers.spaceLarge,
    marginBottom: styleNumbers.spaceLarge,
  },
  input: {
    margin: styleNumbers.spaceLarge,
    backgroundColor: Colors.getTheme().background,
  },
  button: {
    margin: styleNumbers.spaceLarge,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
  viewTextInput: {
    marginTop: styleNumbers.spaceLarge,
  },
});
export default BeCandidateScreen;
