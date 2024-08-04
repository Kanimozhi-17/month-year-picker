# aekimena-month-year-picker

A customizable month-year picker component for React Native. Easily integrate a month-year picker with various customization options to fit your app's design.

## Installation

You can install the package via npm or yarn:

```bash
  npm install aekimena-month-year-picker
```

or

```bash
  yarn add aekimena-month-year-picker
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import MonthYearPicker from "@aekimena/month-year-picker";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <View style={styles.container}>
      <Button title="Show Picker" onPress={() => setVisible(true)} />
      <MonthYearPicker
        visible={visible}
        onRequestClose={() => setVisible(false)}
        onConfirm={(text) => {
          setDate(text);
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9FBBBB",
    justifyContent: "center",
    alignItems: "center",
  },
});
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
| onConfirm           | (text: string) => void      | Callback function triggered when the confirm button is pressed.             |              |
| showDays            | boolean                     | Determines if the days list should be shown                                 | true         |
| highlighterStyle    | ViewStyle                   | Custom styles for the highlighter.                                          |              |
| itemTextStyle       | TextStyle                   | Custom styles for the text items.                                           |              |
| itemContainerStyle  | ViewStyle                   | Custom styles for the text item container.                                  |              |
| buttonStyle         | ViewStyle                   | Custom styles for the button.                                               |              |
| buttonTextStyle     | TextStyle                   | Custom styles for the button text.                                          |              |
| buttonText          | string                      | Text displayed on the button.                                               | "Confirm"    |
| disableFutureMonths | boolean                     | Disables months that comes after the current month within the current year. | false        |

## Contributing

> To get started...

### Step 1

- **Option 1**

  - 🍴 Fork this repo!

- **Option 2**
  - 👯 Clone this repo to your local machine using `https://github.com/aekimena/month-year-picker`

### Step 2

- **DO YOUR THING!** 🤌

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/aekimena/month-year-picker" target="_blank">`https://github.com/aekimena/month-year-picker`</a>.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
