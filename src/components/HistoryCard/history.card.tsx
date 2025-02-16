import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import ButtonComponent from '@components/Button/Button';
import styleNumbers from '@styles/common/style.numbers';

const menuItems = [
  {
    title: 'Gelecek Seçimler',
    description: 'Yaklaşan seçimleri görüntüleyin',
    screen: 'UpcomingElections' as const,
    icon: '📅',
  },
  {
    title: 'Güncel Seçimler',
    description: 'Devam eden seçimleri görüntüleyin',
    screen: 'CurrentElections' as const,
    icon: '📈',
  },
  {
    title: 'Geçmiş Seçimler',
    description: 'Tamamlanan seçimleri görüntüleyin',
    screen: 'PastElections' as const,
    icon: '📊',
  },
];

interface HistoryCardComponentProps {
  cityName: string | null;
  style?: ViewStyle;
}

const HistoryCardComponent: React.FC<HistoryCardComponentProps> = ({
  cityName,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <Text style={[CommonStyles.textStyles.title, {textAlign: 'center'}]}>
          {cityName} Seçimleri
        </Text>
      </View>
      {menuItems.map((item, index) => (
        <Card key={index} style={[styles.card]}>
          <Card.Content>
            <Title style={CommonStyles.textStyles.title}>
              {item.icon} {item.title}
            </Title>
            <Paragraph style={CommonStyles.textStyles.paragraph}>
              {item.description}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <ButtonComponent title="İncele" onPress={() => {}} />
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};

export default HistoryCardComponent;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.container,
    width: '100%',
    backgroundColor: Colors.getTheme().transition,
  },
  card: {
    ...CommonStyles.viewStyles.card,
    marginBottom: styleNumbers.spaceLarge,
    ...CommonStyles.shadowStyle,
    backgroundColor: Colors.getTheme().cardBackground,
  },
});
