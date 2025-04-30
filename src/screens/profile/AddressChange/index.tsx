import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Colors, {ColorsSchema} from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import MenuItemComponent from '@icomponents/MenuItem/menu.item';
import {useStyles} from '@hooks/Modular/use.styles';
import ButtonComponent from '@components/Button/Button';
import CommonStyles from '@styles/common/commonStyles';
import {useAddress} from '@hooks/use.address';
import {ProfileStackParamList} from '@navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TextInputComponent from '@components/TextInput/text.input';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
interface AddressChangeScreenProps {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'AddressChange'>;
  route: {
    params: {
      address: AddressViewModel;
    };
  };
}

const AddressChangeScreen: React.FC<AddressChangeScreenProps> = ({route}) => {
  const {address} = route.params;
  const styles = useStyles(createStyles);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('@assets/images/home.png')}
        />
        <TextInputComponent style={styles.textInput} placeholder="Şehir" />
        <TextInputComponent placeholder="İlçe" />
        <TextInputComponent placeholder="Bina numarası" />

        <Text style={styles.text}>{address?.city}</Text>
        <Text style={styles.text}>{address?.district}</Text>
        <Text style={styles.text}>{address?.buildingNo ?? 'Bilgi yok.'}</Text>
      </View>

      <ButtonComponent
        style={styles.button}
        title="Adres Bilgilerini Değiştir"
        onPress={() => {}}
      />
    </View>
  );
};

export default AddressChangeScreen;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: styleNumbers.space * 2,
      paddingVertical: styleNumbers.space * 3,
    },
    content: {
      flex: 1,
    },
    image: {
      tintColor: colors.icon,
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: styleNumbers.space * 2,
    },
    button: {
      alignItems: 'flex-end',
    },
    text: {
      ...CommonStyles.textStyles.title,
    },
    textInput: {
      width: '100%',
    },
  });
