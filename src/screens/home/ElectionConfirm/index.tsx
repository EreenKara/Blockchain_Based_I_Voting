import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, SharedStackParamList} from '@navigation/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useStyles} from '@hooks/Modular/use.styles';
import createStyles from './index.style';
import {ExtendedAsset} from '@hooks/useCamera';
import useConfirmElection from '@hooks/use.confirm.election';
import ActivityIndicatorComponent from '@screens/shared/activity.indicator';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '@components/Button/Button';
import formatDate from '@utility/format.date';

type Props = NativeStackScreenProps<SharedStackParamList, 'ElectionConfirm'>;

export interface FormValues {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: ExtendedAsset | null;
}

type RootProps = NativeStackNavigationProp<RootStackParamList>;

const ElectionConfirmScreen: React.FC<Props> = ({navigation, route}) => {
  const styles = useStyles(createStyles);
  const homeNavigation = useNavigation<RootProps>();
  const {electionId} = route.params;

  const {
    fetchElectionDetail,
    election,
    fetchLoading,
    fetchError,
    fetchSuccess,
    confirmElection,
    confirmError,
    confirmLoading,
    confirmSuccess,
  } = useConfirmElection();

  useEffect(() => {
    fetchElectionDetail(electionId);
  }, []);

  useEffect(() => {
    if (confirmSuccess) {
      homeNavigation.navigate('Success', {
        success: 'Seçim Başarıyla Oluşturuldu',
        fromScreen: 'Seçim Onay Sayfası',
        toScreen: 'Main',
      });
    }
  }, [confirmSuccess]);

  if (election === null) {
    return <ActivityIndicatorComponent />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.formContainer}
      contentContainerStyle={styles.scrollContainer}>
      <View>
        <View style={styles.nameBox}>
          <Text style={styles.label}>İsim:</Text>
          <Text style={styles.value}>{election.name}</Text>
        </View>

        <View style={styles.nameBox}>
          <Text style={styles.label}>Açıklama:</Text>
          <Text style={styles.value}>{election.description}</Text>
        </View>

        <View style={styles.nameBox}>
          <Text style={styles.label}>Erişim Tipi:</Text>
          <Text style={styles.value}>{election.accessType}</Text>
        </View>

        <View style={styles.nameBox}>
          <Text style={styles.label}>Seçim Tipi:</Text>
          <Text style={styles.value}>{election.electionType}</Text>
        </View>

        <View style={styles.nameBox}>
          <Text style={styles.label}>Başlangıç Tarihi:</Text>
          <Text style={styles.value}>{formatDate(election.startDate)}</Text>
        </View>

        <View style={styles.nameBox}>
          <Text style={styles.label}>Bitiş Tarihi:</Text>
          <Text style={styles.value}>{formatDate(election.endDate)}</Text>
        </View>
      </View>

      <ButtonComponent
        title="Seçimi Onayla"
        onPress={() => confirmElection(electionId)}
      />
    </KeyboardAwareScrollView>
  );
};

export default ElectionConfirmScreen;
