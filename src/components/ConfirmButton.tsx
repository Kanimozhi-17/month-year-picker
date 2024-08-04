import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonProps } from "../typings";
import styles from "../styles";

export const ConfirmButton = ({
  buttonText,
  buttonStyle,
  buttonTextStyle,
  onConfirm,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onConfirm}
      style={[styles.ConfirmButtonStyle, buttonStyle]}
      activeOpacity={0.5}
    >
      <Text style={[styles.buttonTextStyle, buttonTextStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};
