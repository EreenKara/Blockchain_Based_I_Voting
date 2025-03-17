import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import SearchBarComponent from '@components/SearchBar/search.bar';
import {useStyles} from '@hooks/Modular/use.styles';
import styleNumbers from '@styles/common/style.numbers';

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
  const styles = useStyles(createStyles);
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

      {/* TAM EKRAN MODAL */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}>
        <View style={styles.fullScreenModal}>
          {/* Üst Kısım: Geri Tuşu ve Başlık */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <View style={styles.blank} />
          </View>

          {/* Arama Çubuğu */}
          <SearchBarComponent
            modalTitle={searchBarTitle}
            titleStyle={styles.modalTitle}
            handleSearch={handleSearch}
          />

          {/* İçerik */}
          <View style={styles.contentContainer}>
            {typeof content === 'string' ? <Text>{content}</Text> : content}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchBarModalComponent;

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {},
    searchIcon: {
      width: 24,
      height: 24,
      tintColor: colors.icon,
    },
    iconView: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: styleNumbers.space,
      backgroundColor: colors.background,
      borderRadius: styleNumbers.borderRadius,
    },
    text: {
      ...CommonStyles.textStyles.paragraph,
      paddingRight: styleNumbers.space,
    },
    fullScreenModal: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: styleNumbers.space * 3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: styleNumbers.space,
      paddingBottom: styleNumbers.space,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
    },
    closeButton: {
      padding: styleNumbers.space,
      borderRadius: styleNumbers.borderRadius,
    },
    closeButtonText: {
      ...CommonStyles.textStyles.subtitle,
    },
    modalTitle: {
      ...CommonStyles.textStyles.title,
      paddingHorizontal: styleNumbers.space * 3,
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: styleNumbers.space,
    },
    blank: {
      backgroundColor: 'red',
      width: styleNumbers.space * 3,
    },
  });
