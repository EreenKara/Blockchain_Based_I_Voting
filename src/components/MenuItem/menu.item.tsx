import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ImageStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import Colors from '@styles/common/colors';

interface MenuItemComponentProps {
  icon: any;
  title: string;
  onPress: () => void;
  tintColor?: string;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  icon,
  title,
  onPress,
  tintColor,
  imageStyle,
  textStyle,
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image
      source={icon}
      style={[
        styles.menuIcon,
        {tintColor: tintColor || Colors.getTheme().text},
        imageStyle,
      ]}
    />
    <Text
      style={[CommonStyles.textStyles.paragraph, styles.menuText, textStyle]}>
      {title}
    </Text>
    <Image
      source={require('@assets/images/right-arrow.png')}
      style={[
        styles.arrowIcon,
        {tintColor: tintColor || Colors.getTheme().text},
      ]}
    />
  </TouchableOpacity>
);

export default MenuItemComponent;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: styleNumbers.space * 1.5,
    padding: styleNumbers.space * 2,
  },
  menuIcon: {
    width: 32,
    height: 32,
    marginRight: styleNumbers.space * 2,
  },
  menuText: {
    flex: 1,
  },
  arrowIcon: {
    width: 15,
    height: 15,
  },
});
