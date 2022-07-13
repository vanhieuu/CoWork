import {
    Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { IMessage, StylePropType } from "../constants/ultil";
import Lightbox, { LightboxProps } from "react-native-lightbox-v2";
import PropTypes from 'prop-types'
export interface MessageImageProps<TMessage extends IMessage> {
  currentMessage?: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imageProps?: Partial<ImageProps>;
  lightboxProps?: LightboxProps;
}

const MessageImage = ({
  containerStyle,
  lightboxProps = {},
  imageProps = {},
  imageStyle,
  currentMessage,
}: MessageImageProps<IMessage>) => {
    if (currentMessage == null) {
        return null
      }
  return (
    <View style={[styles.container, containerStyle]}>
    <Lightbox
      activeProps={{
        style: styles.imageActive,
      }}
      {...lightboxProps}
    >
      <Image
        {...imageProps}
        style={[styles.image, imageStyle]}
        source={{ uri: currentMessage.image }}
      />
    </Lightbox>
  </View>
  );
};

export default MessageImage;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: "cover",
  },
  imageActive: {
    flex: 1,
    resizeMode: "contain",
  },
});
MessageImage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: StylePropType,
    imageStyle: StylePropType,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
  }