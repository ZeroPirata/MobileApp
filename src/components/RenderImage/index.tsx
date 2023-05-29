import { ImageViewControll, ImagesRender, ImagesRenderView } from "./style";
import { ScrollView, Dimensions, Animated, View, } from "react-native";
import { IFiles } from "../../interfaces/PostInterface";
import themes from "../../styles/themes";
import React, { useRef } from "react";

const { width } = Dimensions.get("window");

interface IRenderImagesComponentProps {
  arrayImages: IFiles[];
}
export const RenderImagesComponent: React.FC<IRenderImagesComponentProps> = ({
  arrayImages,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, width);
  return (
    <ImageViewControll
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ImagesRenderView style={{ width, height: width }}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {arrayImages
            ? arrayImages.map((image, index) => {
              return (
                <ImagesRender
                  key={index}
                  source={{ uri: image.url }}
                  style={{ width, height: width }}
                />
              );
            })
            : null}
        </ScrollView>
      </ImagesRenderView>
      <View style={{ flexDirection: "row" }}>
        {Number(arrayImages.length) > 1 && arrayImages
          ? arrayImages.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 5,
                  width: 15,
                  backgroundColor: themes.COLORS.MAINFill,
                  marginLeft: 8,
                  marginTop: 8,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              />
            );
          })
          : null}
      </View>
    </ImageViewControll>
  );
};
