import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import styleNumbers from '@styles/common/style.numbers';
interface ActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

const ActivityIndicatorComponent: React.FC<ActivityIndicatorProps> = ({
  size = 'large',
  color = Colors.getTheme().button,
  fullScreen = false,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <RNActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.viewStyles.centerContainer,
    padding: styleNumbers.space,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.getTheme().background,
    zIndex: 999,
  },
});

export default ActivityIndicatorComponent;
