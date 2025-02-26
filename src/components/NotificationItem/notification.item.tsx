import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';

interface NotificationItemComponentProps {
  image: string;
  reasonTitle: string;
  sender: string;
  notificationCount: number;
  time: Date;
}

const NotificationItemComponent = ({
  image,
  reasonTitle,
  sender,
  notificationCount,
  time,
}: NotificationItemComponentProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? {uri: image} : require('@assets/images/no-avatar.png')}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, styles.text]}>{reasonTitle}</Text>
        <Image source={require('@assets/images/dot.png')} style={styles.dot} />
        <Text style={[styles.source, styles.text]}>{sender}</Text>
        <Image source={require('@assets/images/dot.png')} style={styles.dot} />
        <Text style={[styles.count, styles.text]}>
          {notificationCount} yeni bildirim
        </Text>
        <Image source={require('@assets/images/dot.png')} style={styles.dot} />
        <Text style={[styles.time, styles.text]}>{time.toLocaleString()}</Text>
        <Image
          source={require('@assets/images/bell_notification.png')}
          style={styles.smallLogo}
        />
      </View>
      <Image
        source={require('@assets/images/down-arrow.png')}
        style={styles.downArrow}
      />
    </View>
  );
};

export default NotificationItemComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: Colors.getTheme().cardButton,
    ...CommonStyles.shadowStyle,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: styleNumbers.spaceLittle,
    flex: 1,
    marginLeft: 10,
  },
  text: {
    color: Colors.getTheme().cardText,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
  },
  source: {
    fontSize: 12,
    color: '#999',
  },
  count: {
    fontSize: 12,
    color: '#999',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  smallLogo: {
    tintColor: Colors.getTheme().cardText,

    width: 25,
    height: 18,
    marginLeft: 10,
  },
  downArrow: {
    tintColor: Colors.getTheme().cardText,
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  dot: {
    tintColor: Colors.getTheme().cardText,
    width: 5,
    height: 5,
    marginTop: 8,
  },
});
