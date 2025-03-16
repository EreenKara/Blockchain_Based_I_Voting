import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChoiceCardComponent from '@icomponents/ChoiceCard/choice.card';
import {ElectionInfoScreen} from '@screens/home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import Colors, {ColorsSchema} from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import {useElectionCreationContext} from '@contexts/election.creation.context';
import {useStyles} from '@hooks/Modular/use.styles';
type Props = NativeStackScreenProps<HomeStackParamList, 'BlockchainOrDb'>;

const BlockchainOrDbScreen: React.FC<Props> = ({navigation}) => {
  const styles = useStyles(createStyles);
  const {setDbType} = useElectionCreationContext();
  return (
    <View style={styles.container}>
      <View style={styles.transparentContainer}>
        <ChoiceCardComponent
          title="Veri Tabanı"
          description="Veri tabanında tutulan seçimler"
          image={require('@assets/images/db_image.png')}
          onPress={() => {
            setDbType('database');
            navigation.navigate('ElectionInfo', {dbType: 'database'});
          }}
        />
        <ChoiceCardComponent
          title="Blockchain"
          description="Blockchain üzerinde tutulan seçimler"
          image={require('@assets/images/blockchain_image.png')}
          onPress={() => {
            setDbType('blockchain');
            navigation.navigate('ElectionInfo', {dbType: 'blockchain'});
          }}
        />
      </View>
    </View>
  );
};

export default BlockchainOrDbScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    transparentContainer: {
      flex: 1,
      backgroundColor: colors.transparentColor,
      padding: styleNumbers.space,
    },
  });
