import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
import {useNavigation} from '@react-navigation/native';

interface ErrorScreenProps {
  fromScreen: string;
  toScreen?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const ErrorScreenComponent: React.FC<ErrorScreenProps> = ({
  fromScreen,
  toScreen = 'Home',
  message = 'Bir hata oluştu',
  onRetry,
  fullScreen = true,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        fullScreen ? styles.fullScreen : styles.partialScreen,
      ]}>
      <View style={styles.content}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorMessage}>{message}</Text>
        {onRetry && (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate(toScreen as never)}>
            <Text style={styles.retryText}>Kurtar Beni</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.centerContainer,
    padding: styleNumbers.space,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.getTheme().background,
  },
  partialScreen: {
    backgroundColor: Colors.getTheme().cardBackground,
    borderRadius: styleNumbers.borderRadius,
    margin: styleNumbers.space,
    ...CommonStyles.shadowStyle,
  },
  content: {
    alignItems: 'center',
    padding: styleNumbers.space,
  },
  errorIcon: {
    fontSize: styleNumbers.textSize * 3,
    marginBottom: styleNumbers.space,
  },
  errorMessage: {
    ...CommonStyles.textStyles.paragraph,
    color: Colors.getTheme().error,
    textAlign: 'center',
    marginBottom: styleNumbers.space * 2,
  },
  retryButton: {
    backgroundColor: Colors.getTheme().button,
    paddingHorizontal: styleNumbers.space * 2,
    paddingVertical: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
    marginTop: styleNumbers.space,
  },
  retryText: {
    ...CommonStyles.textStyles.paragraph,
    color: Colors.getTheme().button,
  },
});

export default ErrorScreenComponent;
