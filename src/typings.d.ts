import { TextStyle, ViewStyle } from "react-native";

export type MonthYearPickerProps = {
  /** Determines whether the month-year picker is visible.
   * @default false
   */
  visible: boolean;

  /** Specifies the animation type for the modal presentation.
   * @default "fade"
   */
  animationType?: "none" | "slide" | "fade";

  /** Indicates if the modal should be transparent.
   * @default true
   */
  transparent?: boolean;

  /** Callback function triggered when the request to close the modal occurs. */
  onRequestClose?: () => void;

  /** Callback function triggered when the modal background is pressed. */
  onBackgroundPress?: () => void;

  /** Sets the opacity of the modal background.
   * @default 0.5
   */
  opacity?: number;

  /** Custom styles for the month-year picker container. */
  containerStyle?: ViewStyle;

  /** Specifies the maximum date that can be selected.
   * @default "Current date"
   */
  maxDate?: string;

  /** Specifies the minimum date that can be selected.
   * @default "2000-01-01"
   */
  minDate?: string;

  /** Callback function triggered when the confirm button is pressed. */
  onConfirm: (value: string) => void;

  /** Determines if the days list should be shown.
   * @default true
   */
  showDays?: boolean;

  /** Custom styles for the highlighter. */
  highlighterStyle?: ViewStyle;

  /** Custom styles for the text items. */
  itemTextStyle?: TextStyle;

  /** Custom styles for the text item container. */
  itemContainerStyle?: ViewStyle;

  /** Custom styles for the highlighted items */

  highlightedItemStyle?: TextStyle;

  /** Custom styles for the button. */
  buttonStyle?: ViewStyle;

  /** Custom styles for the button text. */
  buttonTextStyle?: TextStyle;

  /** Text displayed on the button.
   * @default "Confirm"
   */
  buttonText?: string;
};

type ButtonProps = {
  buttonText: string;
  buttonStyle: ViewStyle;
  onConfirm: () => void;
  buttonTextStyle?: TextStyle;
};

type DateFlatListProps = {
  data: Array<number | string>;
  onScrollToIndex: (index: number) => void;
  highlightedItem: number | string;
  yScrollOffset: number;
  itemTextStyle: TextStyle;
  itemContainerStyle: ViewStyle;
  highlightedItemStyle: TextStyle;
};
