import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChoiceCardComponent from '@icomponents/ChoiceCard/choice.card';
import {ElectionInfoScreen} from '@screens/home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
type Props = NativeStackScreenProps<HomeStackParamList, 'DefaultCustom'>;

const DefaultCustomScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.transparentContainer}>
        <ChoiceCardComponent
          title="Default"
          description="Herkesin kullandığı otomatik ayarlar"
          image={require('@assets/images/default-settings.png')}
          onPress={() => navigation.navigate('ElectionInfo')}
          tintColor={Colors.getTheme().icon}
        />
        <ChoiceCardComponent
          title="Custom"
          description="Teknik ayarları yönetin"
          image={require('@assets/images/custom_settings.png')}
          onPress={() => navigation.navigate('ElectionInfo')}
          tintColor={Colors.getTheme().icon}
        />
      </View>
    </View>
  );
};

export default DefaultCustomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
  },
  transparentContainer: {
    flex: 1,
    backgroundColor: Colors.getTheme().transparentColor,
    padding: styleNumbers.space,
  },
});
