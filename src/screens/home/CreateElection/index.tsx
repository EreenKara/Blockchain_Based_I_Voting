import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChoiceCardComponent from '@icomponents/ChoiceCard/choice.card';
import {ElectionInfoScreen} from '@screens/home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
type Props = NativeStackScreenProps<HomeStackParamList, 'CreateElection'>;

const CreateElectionScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.transparentContainer}>
        <ChoiceCardComponent
          title="Veri Tabanı ile"
          description="Seçim Açıklaması"
          image={require('@assets/images/db_image.png')}
          onPress={() => navigation.navigate('DefaultCustom')}
        />
        <ChoiceCardComponent
          title="Blockchain ile"
          description="Seçim Açıklaması"
          image={require('@assets/images/blockchain_image.png')}
          onPress={() => navigation.navigate('DefaultCustom')}
        />
      </View>
    </View>
  );
};

export default CreateElectionScreen;

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
