import React from 'react';
import {View, Text, Image} from 'react-native';
import createStyles from './election.card.item.style';
import ButtonComponent from '@components/Button/Button';
import {useStyles} from '@hooks/Modular/use.styles';
import {BaseElectionViewModel} from '@viewmodels/base.election.viewmodel';
import {ElectionViewModel} from '@viewmodels/election.viewmodel';

const isElectionViewModel = (
  election: BaseElectionViewModel,
): election is ElectionViewModel => {
  const result =
    'step' in election &&
    typeof (election as ElectionViewModel).step === 'string';
  console.log('result:', result);
  console.log('selam');
  return result;
};
interface ElectionCardItemProps {
  election: BaseElectionViewModel;
  navigatePress: () => void;
  buttonTitle?: string;
}

const ElectionCardItemComponent: React.FC<ElectionCardItemProps> = ({
  election,
  navigatePress,
  buttonTitle = 'Seçime Git',
}) => {
  const styles = useStyles(createStyles);

  const getTitle = () => {
    if (isElectionViewModel(election)) {
      switch (election.step) {
        case 'step 2':
          return 'To Access';
        case 'step 3':
          return 'To Candidate';
        case 'step 4':
          return 'To Election';
        default:
          return 'To Election';
      }
    }
    return buttonTitle;
  };
  const title = getTitle();

  return (
    <View style={styles.container}>
      <Image source={{uri: election.image}} style={styles.image} />

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
            <Text style={styles.text}>Veri tipi: {election.dbType}</Text>
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
