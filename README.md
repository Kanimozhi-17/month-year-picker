# @aekimena/month-year-picker

A customizable month-year picker component for React Native. Easily integrate a month-year picker with various customization options to fit your app's design.

## Installation

You can install the package via npm or yarn:

```bash
  npm install @aekimena/month-year-picker
```

or

```bash
  yarn add @aekimena/month-year-picker
```

## Basic Usage

```javascript
import MonthYearPicker from "@aekimena/month-year-picker";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <View style={styles.container}>
      <MonthYearPicker
        visible={visible}
        onBackgroundPress={() => setVisible(false)}
        onRequestClose={() => setVisible(false)}
        onConfirm={(value) => {
          setDate(value);
        }}
        minDate="2020-12-30"
        maxDate="2026-12-30"
        disableFutureMonths={false}
        showDays={true}
        transparent={true}
        opacity={0.3}
        animationType="slide"
      />
    </View>
  );
};
export default App;
```

## Props

| **Props**           | **Type**                    | **Description**                                                             | **Default**  |
| ------------------- | --------------------------- | --------------------------------------------------------------------------- | ------------ |
| visible             | boolean                     | Determines whether the month-year picker is visible                         | false        |
| animationType       | "none" \| "slide" \| "fade" | Specifies the animation type for the modal presentation.                    | "fade"       |
| transparent         | boolean                     | Indicates if the modal should be transparent.                               | true         |
| onRequestClose      | () => void                  | Callback function triggered when the request to close the modal occurs.     |              |
| onBackgroundPress   | () => void                  | Callback function triggered when the modal background is pressed.           |              |
| opacity             | number                      | Sets the opacity of the modal background.                                   | 0.5          |
| containerStyle      | ViewStyle                   | Custom styles for the month-year picker container.                          |              |
| maxDate             | string                      | Specifies the maximum date that can be selected.                            | "2024-12-30" |
| minDate             | string                      | Specifies the minimum date that can be selected.                            | "1970-12-30" |
| onConfirm           | (value: string) => void     | Callback function triggered when the confirm button is pressed.             |              |
| showDays            | boolean                     | Determines if the days list should be shown                                 | true         |
| highlighterStyle    | ViewStyle                   | Custom styles for the highlighter.                                          |              |
| itemTextStyle       | TextStyle                   | Custom styles for the text items.                                           |              |
| itemContainerStyle  | ViewStyle                   | Custom styles for the text item container.                                  |              |
| buttonStyle         | ViewStyle                   | Custom styles for the button.                                               |              |
| buttonTextStyle     | TextStyle                   | Custom styles for the button text.                                          |              |
| buttonText          | string                      | Text displayed on the button.                                               | "Confirm"    |
| disableFutureMonths | boolean                     | Disables months that comes after the current month within the current year. | false        |
