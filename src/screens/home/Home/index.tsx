import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import ButtonComponent from '@components/Button/Button';
import {
  useAuthContext,
  useElectionCreationContext,
  useUserProfileContext,
} from '@contexts/index';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {token} = useAuthContext();
  const {step} = useElectionCreationContext();
  let menuItems;
  if (token === null) {
    menuItems = [
      {
        title: 'Seçimler',
        description: 'İstediğiniz bir seçimi görüntüleyin',
        screen: 'Elections' as const,
        icon: '📅',
      },
    ];
  } else {
    menuItems = [
      {
        title: 'Seçim Oluştur',
        description: 'Yeni bir seçim oluşturun ve yönetin',
        screen: 'BlockchainOrDb' as const,
        icon: '🗳️',
      },
      {
        title: 'Seçimler',
        description: 'İstediğiniz bir seçimi görüntüleyin',
        screen: 'Elections' as const,
        icon: '📅',
      },
      {
        title: 'Aday Ol',
        description: 'Seçimlere aday olarak katılın',
        screen: 'BeCandidate' as const,
        icon: '👤',
      },
    ];
  }

  return (
    <View style={[styles.container]}>
      {menuItems.map((item, index) => (
        <Card key={index} style={[styles.card]}>
          <Card.Content>
            <Title
              style={[
                CommonStyles.textStyles.title,
                {color: Colors.getTheme().cardText},
              ]}>
              {item.icon} {item.title}
            </Title>
            <Paragraph
              style={[
                CommonStyles.textStyles.paragraph,
                {color: Colors.getTheme().cardText},
              ]}>
              {item.description}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <ButtonComponent
              title="İncele"
              onPress={() => {
                if (item.screen === 'BlockchainOrDb') {
                  switch (step) {
                    case 1:
                      navigation.navigate('BlockchainOrDb');
                      break;
                    case 2:
                      navigation.navigate('PublicOrPrivate');
                      break;
                    case 3:
                      navigation.navigate('ElectionCandidates');
                      break;
                    case 4:
                      navigation.navigate('DefaultCustom');
                      break;
                    default:
                      navigation.navigate('BlockchainOrDb');
                  }
                } else navigation.navigate(item.screen);
              }}
            />
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: styleNumbers.space,
    backgroundColor: Colors.getTheme().background,
  },
  card: {
    ...CommonStyles.viewStyles.card,
    marginBottom: styleNumbers.space,
  },
});

export default HomeScreen;
