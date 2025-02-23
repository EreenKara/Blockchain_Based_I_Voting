import React, {useState} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonComponent from '@components/Button/Button';
import {handleDateTimeChange} from '@hooks/handleDateTimeChange';
import styleNumbers from '@styles/common/style.numbers';
interface StartToEndDateComponentProps {
  values: {
    startDate: Date;
    endDate: Date;
  };
  setFieldValue: (field: string, value: any) => void;
  showMessage: (message: string) => void;
}

const StartToEndDateComponent: React.FC<StartToEndDateComponentProps> = ({
  values,
  setFieldValue,
  showMessage,
}) => {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  return (
    <>
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

      {showStartDate && (
        <DateTimePicker
          value={values.startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShowStartDate(false);
            handleDateTimeChange(
              selectedDate,
              values,
              setFieldValue,
              'startDate',
              false,
              showMessage,
            );
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
            handleDateTimeChange(
              selectedDate,
              values,
              setFieldValue,
              'startDate',
              true,
              showMessage,
            );
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
            handleDateTimeChange(
              selectedDate,
              values,
              setFieldValue,
              'endDate',
              false,
              showMessage,
            );
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
            handleDateTimeChange(
              selectedDate,
              values,
              setFieldValue,
              'endDate',
              true,
              showMessage,
            );
          }}
        />
      )}
    </>
  );
};

export default StartToEndDateComponent;

const styles = StyleSheet.create({
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
});
