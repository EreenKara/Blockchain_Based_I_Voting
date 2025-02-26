import {ActivityIndicatorComponent, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ElectionCardComponent from '@icomponents/ElectionCard/election.card';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import {ElectionService} from '@services/backend/concrete/election.service';
import {Election} from '@entities/election.entity';
import {ElectionStatus} from '@enums/election.status';
import {ElectionAccessType} from '@enums/election.access.type';
import ElectionCardItemComponent from '@icomponents/ElectionCardItem/election.card.item';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';

type CreatedElectionsScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  'CreatedElections'
>;

const CreatedElectionsScreen: React.FC<CreatedElectionsScreenProps> = ({
  navigation,
}) => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const electionService = new ElectionService();
  const loadElections = async () => {
    setLoading(true);
    let elections;
    try {
      elections = await electionService.getElectionsByCity('1');
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

  if (loading) {
    return (
      <View style={CommonStyles.viewStyles.centerContainer}>
        <ActivityIndicatorComponent size="large" />
      </View>
    );
  }
  const defaultRenderItem = ({item}: {item: ElectionViewModel}) => (
    <ElectionCardItemComponent
      election={item}
      navigatePress={() =>
        navigation.navigate('SpecificElection', {
          election: item,
        })
      }
    />
  );
  return (
    <View style={styles.container}>
      <ElectionCardComponent
        title={`Oluşturulan Seçimler`}
        items={elections.map(election => new ElectionViewModel(election))}
        renderItem={defaultRenderItem}
      />
    </View>
  );
};

export default CreatedElectionsScreen;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    backgroundColor: Colors.getTheme().background,
  },
});
