import React, {useState, useContext} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {TextInput, Button, Snackbar, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AuthContext} from '../../../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import TextInputComponent from '@components/TextInput/text.input';
import ButtonComponent from '@components/Button/Button';
type Props = NativeStackScreenProps<HomeStackParamList, 'CreateElection'>;

const CreateElectionScreen: React.FC<Props> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const onStartDateChange = (_: any, selectedDate?: Date) => {
    setShowStartDate(false);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(startDate.getHours());
      newDate.setMinutes(startDate.getMinutes());
      setStartDate(newDate);

      // Eğer bitiş tarihi başlangıç tarihinden önceyse güncelle
      if (endDate <= newDate) {
        const newEndDate = new Date(newDate);
        newEndDate.setDate(newDate.getDate() + 1);
        setEndDate(newEndDate);
      }
    }
  };

  const onStartTimeChange = (_: any, selectedDate?: Date) => {
    setShowStartTime(false);
    if (selectedDate) {
      const newDate = new Date(startDate);
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      setStartDate(newDate);
    }
  };

  const onEndDateChange = (_: any, selectedDate?: Date) => {
    setShowEndDate(false);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(endDate.getHours());
      newDate.setMinutes(endDate.getMinutes());
      setEndDate(newDate);
    }
  };

  const onEndTimeChange = (_: any, selectedDate?: Date) => {
    setShowEndTime(false);
    if (selectedDate) {
      const newDate = new Date(endDate);
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      setEndDate(newDate);
    }
  };

  const handleCreate = async () => {};

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInputComponent
          label="Seçim Başlığı"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInputComponent
          label="Açıklama"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.input}
        />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Başlangıç:</Text>
        <View style={styles.dateTimeButtons}>
          <ButtonComponent
            title={startDate.toLocaleDateString('tr-TR')}
            onPress={() => setShowStartDate(true)}
            style={styles.dateButton}
          />
          <ButtonComponent
            title={startDate.toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            onPress={() => setShowStartTime(true)}
            style={styles.timeButton}
          />
          <ButtonComponent
            title={startDate.toLocaleTimeString('tr-TR', {
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
            title={endDate.toLocaleDateString('tr-TR')}
            onPress={() => setShowEndDate(true)}
            style={styles.dateButton}
          />
          <ButtonComponent
            title={endDate.toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            onPress={() => setShowEndTime(true)}
            style={styles.timeButton}
          />
        </View>
      </View>

      {showStartDate && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onStartDateChange}
          minimumDate={new Date()}
        />
      )}

      {showStartTime && (
        <DateTimePicker
          value={startDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onStartTimeChange}
        />
      )}

      {showEndDate && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onEndDateChange}
          minimumDate={startDate}
        />
      )}

      {showEndTime && (
        <DateTimePicker
          value={endDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onEndTimeChange}
        />
      )}

      <ButtonComponent
        title="Seçim Oluştur"
        onPress={handleCreate}
        style={styles.submitButton}
      />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default CreateElectionScreen;
