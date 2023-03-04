import React from "react";
import { ActivityIndicator } from "react-native";

import { ButtonProps } from "../../interfaces/ButtonInterfaces";
import { Button, TextBtn, Content } from "./style";
import { FontAwesome } from "@expo/vector-icons";
import { ButtonStyle, variants } from "./variants";

const Btn: React.FC<ButtonProps> = ({
  variant = "LargeButtonGoldBorded",
  disabled,
  title,
  style,
  onPress,
  fontSize,
  fontFamily,
  isLoading,
  fontColor,
  IconName,
  IconColor,
  IconSize,
  ...rest
}) => {
  const buttonVariant = variants[variant];
  const buttonStyle: ButtonStyle = disabled
    ? buttonVariant.disabled
    : buttonVariant.enabled;
  return (
    <Button
      style={[buttonStyle.button, style]}
      disabled={isLoading || disabled}
      onPress={onPress}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={buttonStyle.icon.color} />
      ) : (
        <Content>
          {IconName && (
            <FontAwesome
              size={IconSize || buttonStyle.icon.size || 25}
              color={IconColor || buttonStyle.icon.color}
              name={IconName}
              style={{
                marginRight: 15,
              }}
            />
          )}
          <TextBtn
            style={{
              fontFamily: fontFamily || buttonStyle.title.fontFamily,
              fontSize: fontSize || buttonStyle.title.fontSize,
              color: fontColor || buttonStyle.title.color,
            }}
          >
            {title}
          </TextBtn>
        </Content>
      )}
    </Button>
  );
};

export { Btn };
