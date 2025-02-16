import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '@styles/common/colors';
import {electionCardItemStyles as styles} from './election.card.item.style';
import styleNumbers from '@styles/common/style.numbers';
import ButtonComponent from '@components/Button/Button';
import ProgressBarComponent from '@components/ProgressBar/progress.bar';
interface ElectionCardItemProps {
  title: string;
  quantity: string;
  price: number;
  image: any;
  onRemove?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const ElectionCardItemComponent: React.FC<ElectionCardItemProps> = ({
  title,
  quantity,
  price,
  image,
  onRemove,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.container}>
      {/* Sol taraf - Resim */}
      <Image source={image} style={styles.image} />

      {/* Orta kısım - Başlık ve Detaylar */}
      <View style={styles.contentContainer}>
        <ProgressBarComponent />
        <Text style={styles.title}>Sehir adi felan </Text>
        <Text style={styles.quantity}>Baslangic tarihi: </Text>
        <Text style={styles.quantity}>Bitis tarihi: </Text>
      </View>

      {/* Sağ taraf - Fiyat ve Kaldır */}
      <View style={styles.rightContainer}>
        <View style={styles.removeButton}></View>
        <ButtonComponent title="Seçime Git" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ElectionCardItemComponent;
