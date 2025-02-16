import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Modal,
  ViewStyle,
  Platform,
  Pressable,
  Dimensions,
} from 'react-native';
import React from 'react';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';

interface CenteredModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  withInput?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const CenteredModalComponent: React.FC<CenteredModalComponentProps> = ({
  isOpen,
  withInput,
  children,
  style,
  onClose,
  ...rest
}) => {
  const content = withInput ? (
    <TouchableWithoutFeedback
      style={{flex: 1, width: '100%', height: '100%'}}
      onPress={() => {
        onClose();
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.modalContainer]}>
        <View style={[styles.modalContent, style]}>{children}</View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback
      style={{flex: 1, width: '100%', height: '100%'}}
      onPress={() => {
        onClose();
      }}>
      <View style={[styles.modalContainer]}>
        <View style={[styles.modalContent, style]}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      {...rest}
      onRequestClose={onClose} // androidde geri tuşuyla kapatmak için
    >
      {content}
    </Modal>
  );
};

export default CenteredModalComponent;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.getTheme().transparentColor,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: Colors.getTheme().cardBackground,
    padding: styleNumbers.space,
    marginHorizontal: styleNumbers.space * 2,
    width: width * 0.9,
    height: height * 0.35,
    alignItems: 'center',
    borderRadius: styleNumbers.borderRadius,
    ...CommonStyles.shadowStyle,
  },
});
