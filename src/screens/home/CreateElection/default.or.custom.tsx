import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ChoiceCardComponent from '@icomponents/ChoiceCard/choice.card';
import {ElectionInfoScreen} from '@screens/home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList, SharedStackParamList} from '@navigation/types';
import Colors, {ColorsSchema} from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import {useStyles} from '@hooks/Modular/use.styles';
import useElectionChoicesDefault from '@hooks/use.election.choices.default';
type Props = NativeStackScreenProps<SharedStackParamList, 'DefaultCustom'>;

const DefaultCustomScreen: React.FC<Props> = ({navigation, route}) => {
  const styles = useStyles(createStyles);
  const {electionId} = route.params;
  const {sendDefaultChoices, loading, error, success} =
    useElectionChoicesDefault();

  useEffect(() => {
    if (success)
      navigation.navigate('ElectionConfirm', {electionId: electionId});
  }, [success]);
  return (
    <View style={styles.container}>
      <View style={styles.transparentContainer}>
        <ChoiceCardComponent
          title="Default"
          description="Herkesin kullandığı otomatik ayarlar"
          image={require('@assets/images/default-settings.png')}
          onPress={() => {
            sendDefaultChoices(electionId);
          }}
          disabled={loading}
          tintColor={Colors.getTheme().icon}
        />
        <ChoiceCardComponent
          title="Custom"
          description="Teknik ayarları yönetin"
          image={require('@assets/images/custom_settings.png')}
          onPress={() => {
            /*navigation.navigate('ElectionChoices', {electionId: electionId}*/
          }}
          disabled={loading}
          tintColor={Colors.getTheme().icon}
        />
      </View>
    </View>
  );
};

export default DefaultCustomScreen;

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
