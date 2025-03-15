import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChoiceCardComponent from '@icomponents/ChoiceCard/choice.card';
import {ElectionInfoScreen} from '@screens/home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import {useElectionCreationContext} from '@contexts/election.creation.context';
type Props = NativeStackScreenProps<HomeStackParamList, 'PublicOrPrivate'>;

const PublicOrPrivateScreen: React.FC<Props> = ({navigation}) => {
  const {election} = useElectionCreationContext();
  if (!election) {
    return (
      <View style={styles.container}>
        <Text>Election not found</Text>
        <Button
          title="Go to Election Info"
          onPress={() =>
            navigation.navigate('ElectionAccess', {accessType: 'public'})
          }
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
