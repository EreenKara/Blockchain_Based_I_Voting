import Colors from '@styles/common/colors';
import React from 'react';
import {Image, StyleSheet, ImageStyle} from 'react-native';

const NavBarTitle: React.FC = () => {
  const navlogo = require('@assets/images/nav_logo.png');

  return <Image style={styles.imagestyle} source={navlogo} />;
};

const styles = StyleSheet.create({
  imagestyle: {
    tintColor: Colors.getTheme().icon,
    height: 50,
    width: 60,
    marginBottom: 5,
    resizeMode: 'contain',
  } as ImageStyle,
});

export default NavBarTitle;
