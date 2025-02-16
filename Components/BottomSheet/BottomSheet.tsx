import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Colors from '../../styles/common/colors';

interface BottomSheetComponentProps {
  index: number;
  setIndex: (index: number) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  snapPoints?: string[];
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  index,
  setIndex,
  snapPoints,
  children,
  style,
}) => {
  const bottomSheetRef = useRef<React.ElementRef<typeof BottomSheet>>(null);
  // variables
  const snapPointsLocal = useMemo(
    () => (snapPoints ? snapPoints : ['30%', '58%']),
    [snapPoints],
  ); // index bunları belirtiyor

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      setIndex(index);
    },
    [setIndex],
  );

  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPointsLocal}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        onClose={() => setIndex(-1)}
        handleStyle={styles.handle}
        handleIndicatorStyle={styles.handleIndicator}>
        <BottomSheetView style={[styles.contentContainer, style]}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.getTheme().transition,
    paddingTop: 0,
    alignItems: 'center',
  },
  handle: {
    backgroundColor: Colors.getTheme().button,
    height: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  handleIndicator: {
    backgroundColor: Colors.getTheme().indicator,
    width: 40,
    height: 5,
    borderRadius: 2.5,
  },
});
