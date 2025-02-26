import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import TextInputComponent from '@components/TextInput/text.input';

interface SearchBarComponentProps {
  modalTitle?: string;
  placeholder?: string;
  handleSearch: () => void;
  inputStyle?: StyleProp<ViewStyle>;
}
const SearchIcon = () => {
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
}) => {
  return (
    <View style={styles.searchContainer}>
      <Text style={[CommonStyles.textStyles.title, styles.text]}>
        {modalTitle}
      </Text>
      <TextInputComponent
        placeholder={placeholder}
        viewStyle={[inputStyle]}
        onPress={handleSearch}
        leftIcon={<SearchIcon />}
      />
    </View>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    borderRadius: styleNumbers.borderRadius,
    paddingHorizontal: styleNumbers.space * 2,
    marginBottom: styleNumbers.space * 2,
  },
  text: {
    paddingRight: styleNumbers.space / 2,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});
