import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "styled-components";
import Icon from "@expo/vector-icons/Ionicons";

import { InputProps } from "../../interfaces/InputInterface";
import { Container, InputContainer } from "./style";
import themes from "../../styles/themes";

const Input = ({
  width,
  marginTop,
  RightIcon,
  LeftIcon,
  iconName,
  iconSize,
  iconColor,
  secureTextEntry = true,
  ...rest
}: InputProps) => {
  const { COLORS } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [secury, setSecury] = useState(secureTextEntry);
  return (
    <Container
      style={{
        width: width,
        marginTop: marginTop,
        borderColor: isFocused
          ? themes.COLORS.HEXTECH_METAL_GOLD.GOLD3
          : themes.COLORS.HEXTECH_METAL_GOLD.GOLD5,
      }}
    >
      {LeftIcon && (
        <Icon
          color={iconColor || COLORS.WHITE}
          style={{ padding: 5 }}
          size={iconSize}
          name={iconName}
        />
      )}
      <InputContainer
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        underlineColorAndroid="transparent"
        placeholderTextColor={COLORS.GRAY3}
        secureTextEntry={secury}
      />
      {RightIcon && (
        <TouchableOpacity onPress={() => setSecury(!secury)}>
          <Icon
            color={iconColor || COLORS.WHITE}
            name={secury ? "eye" : "eye-off"}
            style={{ padding: 5 }}
            size={iconSize}
          />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export { Input };
