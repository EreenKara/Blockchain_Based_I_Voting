import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChoiceCardComponent from '@icomponents/ChoiceCard/choice.card';
import {ElectionInfoScreen} from '@screens/home';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {HomeStackParamList, SharedStackParamList} from '@navigation/types';
import Colors, {ColorsSchema} from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import {useElectionCreationContext} from '@contexts/election.creation.context';
import {useStyles} from '@hooks/Modular/use.styles';
import {useNavigation} from '@react-navigation/native';
type Props = NativeStackScreenProps<SharedStackParamList, 'PublicOrPrivate'>;

const PublicOrPrivateScreen: React.FC<Props> = ({navigation}) => {
  const styles = useStyles(createStyles);
  const {election} = useElectionCreationContext();
  const homeNavigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  if (!election) {
    return (
      <View style={styles.container}>
        <Text>Election not found</Text>
        <Button
          title="Go to Election Info"
          onPress={() => homeNavigation.navigate('BlockchainOrDb')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.transparentContainer}>
        <ChoiceCardComponent
          title="Public"
          description="Seçim, seçtiğiniz şehir ve ilçedeki herkese açık hale gelir."
          image={require('@assets/images/un_lock.png')}
          onPress={() =>
            navigation.navigate('ElectionAccess', {accessType: 'public'})
          }
          tintColor={Colors.getTheme().icon}
        />
        <ChoiceCardComponent
          title="Private"
          description="Seçim, sadece seçtiğiniz kişilerin erişebileceği şekilde oluşturulur."
          image={require('@assets/images/lock.png')}
          onPress={() =>
            navigation.navigate('ElectionAccess', {accessType: 'private'})
          }
          tintColor={Colors.getTheme().icon}
        />
      </View>
    </View>
  );
};

export default PublicOrPrivateScreen;

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
