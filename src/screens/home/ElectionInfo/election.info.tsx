import React, {useState, useContext} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {TextInput, Button, Snackbar, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
import {Formik} from 'formik';
import {
  launchCamera,
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import CommonStyles from '@styles/common/commonStyles';

type Props = NativeStackScreenProps<HomeStackParamList, 'ElectionInfo'>;

interface FormValues {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string | null;
  color: string;
}

const ElectionInfoScreen: React.FC<Props> = ({navigation}) => {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    setMessage('Başarılı, bir sonraki ekrana yönlendiriliyorsunuz...');
    setVisible(true);
    setTimeout(() => {
      navigation.navigate('ElectionInfo');
    }, 2000);
  };

  const initialValues: FormValues = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    image: null,
    color: '#',
  };

  const cameraOptions: CameraOptions = {
    mediaType: 'photo',
    includeBase64: true,
    saveToPhotos: true,
    cameraType: 'back',
  };

  const imageOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true,
    selectionLimit: 1,
  };

  const handleCamera = async (
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const result = await launchImageLibrary(imageOptions);
    if (result.assets && result.assets[0]) {
      setFieldValue('image', result.assets[0].uri);
    }
  };

  return (
    <View
      style={[
        {
          flex: 1,
          padding: styleNumbers.space * 2,
          justifyContent: 'center',
          backgroundColor: Colors.getTheme().background,
        },
      ]}>
      <View>
        <Text
          style={[
            {...CommonStyles.textStyles.title},
            {fontSize: styleNumbers.textSize * 2, textAlign: 'center'},
          ]}>
          Seçim Bilgileri
        </Text>
      </View>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values, handleChange, handleSubmit, setFieldValue}) => (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInputComponent
                label="Seçim Başlığı"
                value={values.title}
                onChangeText={handleChange('title')}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInputComponent
                label="Açıklama"
                value={values.description}
                onChangeText={handleChange('description')}
                multiline
                numberOfLines={4}
                style={styles.input}
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                {
                  marginHorizontal: 'auto',
                  marginBottom: styleNumbers.space * 3,
                },
              ]}>
              <TextInputComponent
                label="Renk"
                value={values.color}
                onChangeText={value => {
                  if (value.startsWith('#')) {
                    setFieldValue('color', value);
                  } else {
                    setFieldValue('color', '#' + value);
                  }
                  if (value.length > 7) {
                    setFieldValue('color', value.slice(0, 7));
                  }
                }}
                viewStyle={{
                  width: 100,
                  borderColor:
                    values.color.length > 6
                      ? values.color
                      : Colors.getTheme().button,
                }}
                style={{
                  color:
                    values.color.length > 6
                      ? values.color
                      : Colors.getTheme().text,
                }}
                labelStyle={{
                  color:
                    values.color.length > 6
                      ? values.color
                      : Colors.getTheme().text,
                }}
              />
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Başlangıç:</Text>
              <View style={styles.dateTimeButtons}>
                <ButtonComponent
                  title={values.startDate.toLocaleDateString('tr-TR')}
                  onPress={() => setShowStartDate(true)}
                  style={styles.dateButton}
                />
                <ButtonComponent
                  title={values.startDate.toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  onPress={() => setShowStartTime(true)}
                  style={styles.timeButton}
                />
              </View>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Bitiş:</Text>
              <View style={styles.dateTimeButtons}>
                <ButtonComponent
                  title={values.endDate.toLocaleDateString('tr-TR')}
                  onPress={() => setShowEndDate(true)}
                  style={styles.dateButton}
                />
                <ButtonComponent
                  title={values.endDate.toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  onPress={() => setShowEndTime(true)}
                  style={styles.timeButton}
                />
              </View>
            </View>

            <ButtonComponent
              title="Fotoğraf Seç"
              onPress={() => handleCamera(setFieldValue)}
            />

            {showStartDate && (
              <DateTimePicker
                value={values.startDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, selectedDate) => {
                  setShowStartDate(false);
                  if (selectedDate) {
                    const newDate = new Date(selectedDate);
                    newDate.setHours(values.startDate.getHours());
                    newDate.setMinutes(values.startDate.getMinutes());
                    setFieldValue('startDate', newDate);

                    if (values.endDate <= newDate) {
                      const newEndDate = new Date(newDate);
                      newEndDate.setDate(newDate.getDate() + 1);
                      setFieldValue('endDate', newEndDate);
                      setMessage(
                        'Başlangıç tarihi bitiş tarihinden sonra gelemez. Tarih güncellendi.',
                      );
                      setVisible(true);
                    }
                  }
                }}
                minimumDate={new Date()}
              />
            )}

            {showStartTime && (
              <DateTimePicker
                value={values.startDate}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, selectedDate) => {
                  setShowStartTime(false);
                  if (selectedDate) {
                    const newDate = new Date(values.startDate);
                    newDate.setHours(selectedDate.getHours());
                    newDate.setMinutes(selectedDate.getMinutes());
                    setFieldValue('startDate', newDate);
                    if (values.endDate <= newDate) {
                      const newEndDate = new Date(newDate);
                      newEndDate.setDate(newDate.getDate() + 1);
                      setFieldValue('endDate', newEndDate);
                      setMessage(
                        'Başlangıç tarihi bitiş tarihinden sonra gelemez. Tarih güncellendi.',
                      );
                      setVisible(true);
                    }
                  }
                }}
              />
            )}

            {showEndDate && (
              <DateTimePicker
                value={values.endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, selectedDate) => {
                  setShowEndDate(false);
                  if (selectedDate) {
                    const newDate = new Date(selectedDate);
                    newDate.setHours(values.endDate.getHours());
                    newDate.setMinutes(values.endDate.getMinutes());
                    setFieldValue('endDate', newDate);
                    if (values.startDate >= newDate) {
                      const newStartDate = new Date(values.startDate);
                      newStartDate.setDate(newDate.getDate() - 1);
                      setFieldValue('startDate', newStartDate);
                      setMessage(
                        'Bitiş tarihi başlangıç tarihinden önce gelemez. Tarih güncellendi.',
                      );
                      setVisible(true);
                    }
                  }
                }}
                minimumDate={values.startDate}
              />
            )}

            {showEndTime && (
              <DateTimePicker
                value={values.endDate}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, selectedDate) => {
                  setShowEndTime(false);
                  if (selectedDate) {
                    const newDate = new Date(values.endDate);
                    newDate.setHours(selectedDate.getHours());
                    newDate.setMinutes(selectedDate.getMinutes());
                    setFieldValue('endDate', newDate);
                    if (values.startDate >= newDate) {
                      const newStartDate = new Date(values.startDate);
                      newStartDate.setDate(newDate.getDate() - 1);
                      setFieldValue('startDate', newStartDate);
                      setMessage(
                        'Bitiş tarihi başlangıç tarihinden önce gelemez. Tarih güncellendi.',
                      );
                      setVisible(true);
                    }
                  }
                }}
              />
            )}

            <ButtonComponent
              title="Seçim Oluştur"
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            />
            <Snackbar
              style={{backgroundColor: Colors.getTheme().button}}
              visible={visible}
              onDismiss={() => setVisible(false)}
              duration={3000}>
              {message}
            </Snackbar>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: styleNumbers.space * 4,
    padding: styleNumbers.space,
    backgroundColor: Colors.getTheme().background,
  },
  inputContainer: {
    marginTop: styleNumbers.space * 2,
  },
  input: {},
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: styleNumbers.space,
  },
  dateLabel: {
    flex: 1,
    fontSize: styleNumbers.textSize,
  },
  dateTimeButtons: {
    flex: 2,
    flexDirection: 'row',
    gap: styleNumbers.spaceLittle,
  },
  dateButton: {
    flex: 2,
  },
  timeButton: {
    flex: 1,
  },
  submitButton: {
    marginTop: styleNumbers.space,
  },
});

export default ElectionInfoScreen;
