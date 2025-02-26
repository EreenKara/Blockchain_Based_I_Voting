import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import CenteredModalComponent from '@components/Modal/CenteredModal/centered.modal';
import ButtonComponent from '@components/Button/Button';
import TextInputComponent from '@components/TextInput/text.input';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import SearchBarComponent from '@components/SearchBar/search.bar';

interface SearchBarModalComponentProps {
  handleSearch: () => void;
  title?: string;
  modalTitle?: string;
  style?: StyleProp<ViewStyle>;
  iconTitleStyle?: StyleProp<TextStyle>;
}

const SearchBarModalComponent: React.FC<SearchBarModalComponentProps> = ({
  style,
  title = '',
  iconTitleStyle,
  modalTitle = 'Search',
  handleSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.iconView} onPress={() => setIsOpen(true)}>
        <Text
          style={[
            CommonStyles.textStyles.paragraph,
            styles.text,
            iconTitleStyle,
          ]}>
          {title}
        </Text>
        <Image
          source={require('@assets/images/search-icon.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
      <CenteredModalComponent
        isOpen={isOpen}
        withInput={true}
        onClose={() => setIsOpen(false)}
        style={{
          width: '100%',
          height: 160,
        }}>
        <SearchBarComponent
          modalTitle={modalTitle}
          handleSearch={handleSearch}
        />
      </CenteredModalComponent>
    </View>
  );
};

export default SearchBarModalComponent;

const styles = StyleSheet.create({
  container: {},
  searchIcon: {
    width: 20,
    height: 20,
  },
  iconView: {
    flexDirection: 'row',
  },
  text: {
    paddingRight: styleNumbers.space / 2,
  },
});
