import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import styles from './index.style';
import OptionGroup from '@components/OptionGroup/option.group';

type Props = NativeStackScreenProps<HomeStackParamList, 'ElectionChoices'>;

const ElectionChoicesScreen: React.FC<Props> = ({navigation}) => {
  // Seçeneklerin her bir grup için nasıl yönetileceğine dair bir örnek (onOptionSelect prop'unu kullanarak)
  const handleOptionSelectGroup1 = (selected: string) => {
    console.log('Group1 seçilen option:', selected);
  };

  const handleOptionSelectGroup2 = (selected: string) => {
    console.log('Group2 seçilen option:', selected);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Election Ekranı</Text>

      <OptionGroup
        title="Grup 1 Seçenekleri"
        options={['Seçenek 1', 'Seçenek 2', 'Seçenek 3']}
        onOptionSelect={handleOptionSelectGroup1}
      />

      <OptionGroup
        title="Grup 2 Seçenekleri"
        options={['Option A', 'Option B', 'Option C']}
        onOptionSelect={handleOptionSelectGroup2}
      />

      {/* İstediğin sayıda OptionGroup ekleyebilirsin */}
    </ScrollView>
  );
};

export default ElectionChoicesScreen;
