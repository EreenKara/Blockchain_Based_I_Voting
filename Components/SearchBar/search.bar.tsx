import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Colors, {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import TextInputComponent from '@components/TextInput/text.input';
import {useStyles} from '@hooks/Modular/use.styles';
interface SearchBarComponentProps {
  modalTitle?: string;
  placeholder?: string;
  handleSearch: () => void;
  inputStyle?: StyleProp<ViewStyle>;
  value?: string;
  setValue?: (text: string) => void;
  titleStyle?: StyleProp<TextStyle>;
}
const SearchIcon = () => {
  const styles = useStyles(createStyles);
  return (
    <Image
      source={require('@assets/images/search-icon.png')}
      style={styles.searchIcon}
    />
  );
};
const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  placeholder = '',
  modalTitle = '',
  handleSearch,
  inputStyle,
  value,
  setValue,
  titleStyle,
}) => {
  const styles = useStyles(createStyles);
  return (
    <View style={styles.searchContainer}>
      <Text style={[CommonStyles.textStyles.title, styles.text, titleStyle]}>
        {modalTitle}
      </Text>
      <TextInputComponent
        placeholder={placeholder}
        viewStyle={[inputStyle]}
        onPress={handleSearch}
        leftIcon={<SearchIcon />}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

export default SearchBarComponent;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      borderRadius: styleNumbers.borderRadius,
      paddingHorizontal: styleNumbers.space * 2,
    },
    text: {
      paddingRight: styleNumbers.space / 2,
    },
    searchIcon: {
      width: 20,
      height: 20,
    },
  });
