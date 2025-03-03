import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '@styles/common/colors';
import {electionCardItemStyles as styles} from './election.card.item.style';
import styleNumbers from '@styles/common/style.numbers';
import ButtonComponent from '@components/Button/Button';
import ProgressBarComponent from '@components/ProgressBar/progress.bar';
import LightElectionViewModel from '@viewmodels/light.election.viewmodel';
interface ElectionCardItemProps {
  election: LightElectionViewModel;
  navigatePress: () => void;
  buttonTitle?: string;
}
const ElectionCardItemComponent: React.FC<ElectionCardItemProps> = ({
  election,
  navigatePress,
  buttonTitle = 'Seçime Git',
}) => {
  return (
    <View style={styles.container}>
      {/* Sol taraf - Resim */}
      <Image source={{uri: election.image}} style={styles.image} />

      {/* Orta kısım - Başlık ve Detaylar */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{election.name}</Text>
        <Text style={styles.text}>{election.description}</Text>
        <Text style={styles.text}>
          {new Date(election.startDate).toLocaleDateString('tr-TR')}
        </Text>
        <Text style={styles.text}>
          {new Date(election.endDate).toLocaleDateString('tr-TR')}
        </Text>
      </View>

      {/* Sağ taraf - Fiyat ve Kaldır */}
      <View style={styles.rightContainer}>
        <View style={styles.removeButton}></View>
        <ButtonComponent title={buttonTitle} onPress={navigatePress} />
      </View>
    </View>
  );
};

export default ElectionCardItemComponent;
