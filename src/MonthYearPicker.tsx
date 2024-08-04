import { Modal, Pressable, View } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { getYears } from "./functions/getYears";
import { getDaysInMonth } from "./functions/getDays";
import { getDateDateString } from "./functions/getDateString";
import { monthsArr } from "./utils/months";
import { DateFlatList } from "./components/DateFlatList";
import { Highlighter } from "./components/Highlighter";
import { ConfirmButton } from "./components/ConfirmButton";
import { MonthYearPickerProps } from "./typings";

const currentDate = new Date();

const MonthYearPicker = ({
  visible = false,
  animationType = "fade",
  transparent = true,
  onRequestClose,
  onBackgroundPress,
  opacity = 0.5,
  containerStyle,
  maxDate = "2024-12-1",
  minDate = "1970-12-1",
  onConfirm,
  showDays = true,
  highlighterStyle,
  itemContainerStyle,
  itemTextStyle,
  buttonStyle,
  buttonTextStyle,
  buttonText = "Confirm",
  disableFutureMonths = false,
}: MonthYearPickerProps) => {
  // years array
  const yearsData: Array<number> = getYears({ maxDate, minDate });

  // months array
  const monthsData: Array<string> = monthsArr;

  // highlighted year
  const [higlightedYear, setHighlightedYear] = useState<number>(
    yearsData.indexOf(currentDate.getFullYear())
  );

  // highlighted month
  const [highlightedMonth, setHighlightedMonth] = useState<number>(
    monthsData.indexOf(monthsData[currentDate.getMonth()])
  );

  // days array
  const daysData: Array<number> = getDaysInMonth({
    month: highlightedMonth,
    year: higlightedYear,
  });

  // highlighted day

  const [highlightedMonthDay, setHighlightedMonthDay] = useState<number>(
    daysData.indexOf(currentDate.getDate())
  );

  // Check if the provided date is a valid date type
  const maxDateToCheck = new Date(maxDate);
  const minDateToCheck = new Date(minDate);

  if (isNaN(maxDateToCheck.getTime()) || isNaN(minDateToCheck.getTime())) {
    throw new Error("Date must be a valid date type");
  }

  // Check if the provided date is less/greater than the current date
  if (maxDateToCheck < currentDate) {
    throw new Error(
      "Max date must be greater than or equal to the current date"
    );
  }
  if (minDateToCheck >= currentDate) {
    throw new Error("Min date must be less than the current date");
  }

  // check for opacity error

  if (typeof opacity !== "number") {
    throw new Error("Opacity must be of type number");
  }

  // functions

  // get months array to display

  function getMonthsData() {
    if (disableFutureMonths) {
      return yearsData[higlightedYear] == currentDate.getFullYear()
        ? monthsData.slice(0, currentDate.getMonth() + 1)
        : monthsData;
    }
    return monthsData;
  }

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <View style={[styles.modalContainer]}>
        <View style={[styles.containerStyle, containerStyle, { height: 250 }]}>
          <View style={styles.innerContainer}>
            {/* days flatlist */}
            {showDays == true && (
              <DateFlatList
                data={daysData}
                onScrollToIndex={setHighlightedMonthDay}
                highlightedItem={daysData[highlightedMonthDay]}
                yScrollOffset={daysData.indexOf(currentDate.getDate()) * 50}
                itemContainerStyle={itemContainerStyle}
                itemTextStyle={itemTextStyle}
              />
            )}
            {/* months flatlist */}
            <DateFlatList
              data={getMonthsData()}
              onScrollToIndex={(num) => {
                setHighlightedMonth(num);
              }}
              highlightedItem={monthsData[highlightedMonth]}
              yScrollOffset={
                monthsData.indexOf(monthsData[currentDate.getMonth()]) * 50
              }
              itemContainerStyle={itemContainerStyle}
              itemTextStyle={itemTextStyle}
            />
            {/* years flatlist */}
            <DateFlatList
              data={yearsData}
              onScrollToIndex={setHighlightedYear}
              highlightedItem={yearsData[higlightedYear]}
              yScrollOffset={yearsData.indexOf(currentDate.getFullYear()) * 50}
              itemContainerStyle={itemContainerStyle}
              itemTextStyle={itemTextStyle}
            />
            <Highlighter highlighterStyle={highlighterStyle} />
          </View>
        </View>
        {/* confirm button */}
        <ConfirmButton
          buttonStyle={buttonStyle}
          buttonTextStyle={buttonTextStyle}
          buttonText={buttonText}
          onConfirm={() => {
            onConfirm(
              getDateDateString({
                year: yearsData[higlightedYear],
                month: highlightedMonth,
                day:
                  showDays == false ? undefined : daysData[highlightedMonthDay],
              })
            );
          }}
        />
      </View>
      {/* background */}
      <Pressable
        onPress={onBackgroundPress}
        style={[
          styles.absolutePressItem,
          {
            backgroundColor: `rgba(0,0,0, ${
              opacity > 100 ? 1 : opacity < 0 ? 0 : opacity
            })`,
          },
        ]}
      />
    </Modal>
  );
};

export default MonthYearPicker;
