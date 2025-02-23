import React from 'react';
import {View, Pressable, ImageBackground, Text, StyleSheet} from 'react-native';
import {Asset} from 'react-native-image-picker';
import CommonStyles from '@styles/common/commonStyles';
import Colors from '@styles/common/colors';
import styleNumbers from '@styles/common/style.numbers';
import {useCamera} from '@hooks/useCamera';

interface ExtendedAsset extends Asset {
  containerWidth?: number;
  containerHeight?: number;
}

interface ImagePickerComponentProps {
  image: ExtendedAsset | null;
  fieldName: string;
  setFieldValue: (field: string, value: any) => void;
  responsive?: boolean;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  image,
  fieldName,
  setFieldValue,
  responsive = true,
}) => {
  const {handleCamera} = useCamera();

  return (
    <View style={styles.imageContainer}>
      <Pressable
        onPress={() => handleCamera(fieldName, setFieldValue)}
        style={[
          styles.imagePickerContainer,
          image?.containerHeight && responsive
            ? {
                width: image.containerWidth,
                height: image.containerHeight,
              }
            : null,
        ]}>
        <ImageBackground
          source={
            image === null || !image.uri
              ? require('@assets/images/camera-place-holder.jpg')
              : responsive
              ? {
                  uri: image.uri,
                  width: image.containerWidth,
                  height: image.containerHeight,
                  cache: 'force-cache',
                }
              : {
                  uri: image.uri,
                  cache: 'force-cache',
                }
          }
          style={[styles.image]}
          imageStyle={[styles.imageStyle, image !== null && {opacity: 1}]}>
          <View style={styles.imageOverlay}>
            <Text style={[CommonStyles.textStyles.paragraph, styles.imageText]}>
              {responsive
                ? image === null
                  ? 'Seçim Resmi Ekle'
                  : 'Resmi Değiştir'
                : ''}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    marginTop: styleNumbers.space * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerContainer: {
    width: '100%',
    height: 200,
    borderRadius: styleNumbers.borderRadius,
    overflow: 'hidden',
    backgroundColor: Colors.getTheme().transition,
    borderWidth: 2,
    borderColor: Colors.getTheme().borderColor,
    borderStyle: 'dashed',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    opacity: 0.7,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    backgroundColor: Colors.getTheme().transparentColor,
    padding: styleNumbers.space,
    borderRadius: styleNumbers.borderRadius,
    alignItems: 'center',
  },
  imageText: {
    color: Colors.getTheme().text,
    textAlign: 'center',
  },
});
