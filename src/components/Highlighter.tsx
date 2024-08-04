import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "../styles";

interface Props {
  highlighterStyle: ViewStyle;
}

export const Highlighter = ({ highlighterStyle }: Props) => {
  return (
    <View style={[styles.highlighter, highlighterStyle, { height: 50 }]} />
  );
};
