import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/types';
import styleNumbers from '@styles/common/style.numbers';
import CommonStyles from '@styles/common/commonStyles';
import Colors, {ColorsSchema} from '@styles/common/colors';
import ButtonComponent from '@components/Button/Button';
import {
  useAuthContext,
  useElectionCreationContext,
  useUserProfileContext,
} from '@contexts/index';
import {useStyles} from '@hooks/Modular/use.styles';
type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const styles = useStyles(createStyles);
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
            <Title style={[CommonStyles.textStyles.title, styles.text]}>
              {item.icon} {item.title}
            </Title>
            <Paragraph style={[CommonStyles.textStyles.paragraph, styles.text]}>
              {item.description}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <ButtonComponent
              style={styles.button}
              title="İncele"
              onPress={() => {
                if (item.screen === 'BlockchainOrDb') {
                  switch (step) {
                    case 0:
                      navigation.navigate('BlockchainOrDb');
                      break;
                    case 1:
                      navigation.navigate('Shared', {
                        screen: 'PublicOrPrivate',
                      });
                      break;
                    case 2:
                      navigation.navigate('Shared', {
                        screen: 'ElectionCandidates',
                      });
                      break;
                    case 3:
                      navigation.navigate('Shared', {
                        screen: 'DefaultCustom',
                      });
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
      <ButtonComponent
        title="sadasd"
        onPress={() =>
          navigation.navigate('Shared', {
            screen: 'ElectionResult',
            params: {
              election: {
                id: '',
                name: '',
                description: '',
                endDate: Date.now().toString(),
                startDate: Date.now().toString(),
                image: '',
              },
            },
          })
        }
      />
      <ButtonComponent
        title="Vote"
        onPress={() =>
          navigation.navigate('Shared', {
            screen: 'Vote',
          })
        }
      />
    </View>
  );
};

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: styleNumbers.space,
      backgroundColor: colors.background,
    },
    card: {
      ...CommonStyles.viewStyles.card,
      marginBottom: styleNumbers.space,
    },
    text: {
      color: colors.cardText,
    },
    button: {
      backgroundColor: colors.cardButton,
    },
  });

export default HomeScreen;
