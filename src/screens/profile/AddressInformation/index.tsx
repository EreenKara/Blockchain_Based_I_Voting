import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors, {ColorsSchema} from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import MenuItemComponent from '@icomponents/MenuItem/menu.item';
import {useStyles} from '@hooks/Modular/use.styles';

const AddressInformationScreen = () => {
  const styles = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <MenuItemComponent
        icon={require('@assets/images/home.png')}
        title="Ev"
        tintColor={Colors.getTheme().icon}
        description="Adres Bilgileri"
        onPress={() => {}}
        rightIcon={require('@assets/images/three_dots.png')}
      />
    </View>
  );
};

export default AddressInformationScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: styleNumbers.space * 2,
      paddingVertical: styleNumbers.space * 3,
    },
  });
