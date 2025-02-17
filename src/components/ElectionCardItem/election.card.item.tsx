import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '@styles/common/colors';
import {electionCardItemStyles as styles} from './election.card.item.style';
import styleNumbers from '@styles/common/style.numbers';
import ButtonComponent from '@components/Button/Button';
import ProgressBarComponent from '@components/ProgressBar/progress.bar';
interface ElectionCardItemProps {
  id: string;
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  navigatePress: () => void;
}
const ElectionCardItemComponent: React.FC<ElectionCardItemProps> = ({
  id,
  name,
  description,
  image,
  startDate,
  endDate,
  navigatePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Sol taraf - Resim */}
      <Image source={{uri: image}} style={styles.image} />

      {/* Orta kısım - Başlık ve Detaylar */}
      <View style={styles.contentContainer}>
        <ProgressBarComponent />
        <Text style={styles.title}>Name: {name}</Text>
        <Text style={styles.quantity}>Description: {description}</Text>
        <Text style={styles.quantity}>Start Date: {startDate}</Text>
        <Text style={styles.quantity}>End Date: {endDate}</Text>
      </View>

      {/* Sağ taraf - Fiyat ve Kaldır */}
      <View style={styles.rightContainer}>
        <View style={styles.removeButton}></View>
        <ButtonComponent title="Seçime Git" onPress={navigatePress} />
      </View>
    </View>
  );
};

export default ElectionCardItemComponent;
