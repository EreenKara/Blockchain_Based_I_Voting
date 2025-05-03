import React, {useCallback, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import createStyles from './election.card.item.style';
import ButtonComponent from '@components/Button/Button';
import {useStyles} from '@hooks/Modular/use.styles';
import {BaseElectionViewModel} from '@viewmodels/base.election.viewmodel';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';

const isElectionViewModel = (
  election: BaseElectionViewModel,
): election is ElectionViewModel => {
  const result =
    'step' in election &&
    typeof (election as ElectionViewModel).step === 'string';
  return result;
};
interface ElectionCardItemProps {
  election: BaseElectionViewModel;
  navigatePress: () => void;
  buttonTitle?: string;
}
type ElectionNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const ElectionCardItemComponent: React.FC<ElectionCardItemProps> = ({
  election,
  navigatePress,
  buttonTitle = 'Seçime Git',
}) => {
  const styles = useStyles(createStyles);
  useEffect(() => {
    console.log('ElectionCardItemComponent:', election);
  }, [election]);
  const navigation = useNavigation<ElectionNavigationProp>();

  const getTitle = useCallback(() => {
    if (isElectionViewModel(election)) {
      switch (election.step) {
        case 'Info completed':
          return 'To Access';
        case 'Access completed':
          return 'To Candidate';
        case 'Candidate completed':
          return 'To Choices';
        case 'Choices completed':
          return 'Give Approval';
        case 'Election completed':
          return 'To Election';
      }
    }
    return buttonTitle;
  }, [election, buttonTitle]);
  const getNavigation = useCallback(() => {
    if (isElectionViewModel(election)) {
      switch (election.step) {
        case 'Info completed':
          return navigation.navigate('Shared', {
            screen: 'PublicOrPrivate',
            params: {electionId: election.id},
          });
        case 'Access completed':
          return navigation.navigate('Shared', {
            screen: 'DefaultCustom',
            params: {electionId: election.id},
          });
        case 'Candidate completed':
          return navigation.navigate('Shared', {
            screen: 'ElectionChoices',
            params: {electionId: election.id},
          });
        case 'Choices completed':
          return 'Give Approval';
        case 'Election completed':
          return navigation.navigate('SpecificElection', {
            election: election as BaseElectionViewModel,
          });
      }
    }
    return 'ToElection';
  }, [election]);
  const title = getTitle();

  return (
    <View style={styles.container}>
      <Image
        source={
          election.image
            ? {uri: election.image}
            : require('@assets/images/election_placeholder.png')
        }
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{election.name}</Text>
        <Text style={styles.text}>{election.description}</Text>
        <Text style={styles.text}>
          {new Date(election.startDate).toLocaleDateString('tr-TR')}
        </Text>
        <Text style={styles.text}>
          {new Date(election.endDate).toLocaleDateString('tr-TR')}
        </Text>

        {isElectionViewModel(election) && (
          <>
            <Text style={styles.text}>Veri tipi: {election.electionType}</Text>
          </>
        )}
      </View>

      <View style={styles.rightContainer}>
        <ButtonComponent title={title} onPress={navigatePress} />
      </View>
    </View>
  );
};

export default ElectionCardItemComponent;
