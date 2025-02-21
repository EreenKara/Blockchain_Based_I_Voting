// src/screens/home/CurrentElectionsScreen.tsx
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import {Election} from '@entities/election.entity';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import ActivityIndicatorComponent from '@shared/activity.indicator';
import ButtonComponent from '@components/Button/Button';
import {ElectionService} from '@services/backend/concrete/election.service';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import ElectionCardComponent from '@icomponents/ElectionCard/election.card';
import {SehirViewModel} from '@viewmodels/sehir.viewmodel';
import {HomeStackParamList} from '@navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ElectionAccessType} from '@enums/election.access.type';
import {ElectionStatus} from '@enums/election.status';
import {User} from '@entities/user.entity';
type ElectionsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'UpComingElections'
>;

const UpComingElectionsScreen: React.FC<ElectionsScreenProps> = ({
  route,
  navigation,
}) => {
  const {sehir} = route.params;
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const electionService = new ElectionService();
  const loadElections = async () => {
    setLoading(true);
    let elections;
    try {
      elections = await electionService.getElectionsByCity(sehir.id);
      setElections(elections);
      console.log(elections.length);
    } catch (error) {
      console.error('Seçimler yüklenirken hata oluştu:', error);
    } finally {
      elections = [
        new Election({
          id: '1',
          name: 'Seçim 1',
          description: 'Seçim 1 açıklaması',
          image: '',
          startDate: 'new Date().toISOString()',
          endDate: 'new Date().toISOString()',
          status: ElectionStatus.Active,
          accessType: ElectionAccessType.Public,
        }),
        new Election({
          id: '2',
          name: 'Seçim 2',
          description: 'Seçim 2 açıklaması',
          image: '',
          startDate: 'new Date().toISOString()',
          endDate: 'new Date().toISOString()',
          status: ElectionStatus.Active,
          accessType: ElectionAccessType.Public,
        }),
      ];
      setElections(elections);
      setLoading(false);
    }
  };

  // Ekran her odaklandığında seçimleri yenile
  useFocusEffect(
    React.useCallback(() => {
      loadElections();
    }, []),
  );

  // Her 30 saniyede bir seçimleri güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      loadElections();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={CommonStyles.viewStyles.centerContainer}>
        <ActivityIndicatorComponent size="large" />
      </View>
    );
  }

  if (elections.length === 0) {
    return (
      <View style={CommonStyles.viewStyles.centerContainer}>
        <Text style={CommonStyles.textStyles.title}>
          Gelecek seçim bulunmamaktadır
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ElectionCardComponent
        title={`${sehir.name} Gelecek Seçimleri`}
        items={elections.map(election => new ElectionViewModel(election))}
        sehir={sehir}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    backgroundColor: Colors.getTheme().background,
  },
});

export default UpComingElectionsScreen;
