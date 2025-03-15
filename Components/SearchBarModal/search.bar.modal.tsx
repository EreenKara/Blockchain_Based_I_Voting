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
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import SearchBarComponent from '@components/SearchBar/search.bar';
import FullModalComponent from '@components/Modal/FullModal/full.modal';

interface SearchBarModalComponentProps {
  handleSearch: () => void;
  title?: string;
  modalTitle?: string;
  searchBarTitle?: string;
  style?: StyleProp<ViewStyle>;
  iconTitleStyle?: StyleProp<TextStyle>;
  content?: React.ReactNode;
}

const SearchBarModalComponent: React.FC<SearchBarModalComponentProps> = ({
  style,
  title = '',
  iconTitleStyle,
  modalTitle = 'Search',
  searchBarTitle = '',
  handleSearch,
  content,
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
      <FullModalComponent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={modalTitle}
        style={{
          width: '100%',
          height: 160,
        }}>
        <SearchBarComponent
          modalTitle={searchBarTitle}
          titleStyle={{color: Colors.getTheme().cardText}}
          handleSearch={handleSearch}
        />
        {content}
      </FullModalComponent>
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
