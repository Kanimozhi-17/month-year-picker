import { Modal, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { getYears } from "./functions/getYears";
import { getDaysInMonth } from "./functions/getDays";
import { getDateDateString } from "./functions/getDateString";
import { DateFlatList } from "./components/DateFlatList";
import { Highlighter } from "./components/Highlighter";
import { ConfirmButton } from "./components/ConfirmButton";
import { MonthYearPickerProps } from "./typings";
import { monthsArrayObj } from "./utils/months";

const MonthYearPicker = ({
  visible = false,
  animationType = "fade",
  transparent = true,
  onRequestClose,
  onBackgroundPress,
  opacity = 0.5,
  containerStyle,
  maxDate = new Date().toISOString(),
  minDate = "2000-01-01",
  onConfirm,
  showDays = true,
  highlighterStyle,
  itemContainerStyle,
  itemTextStyle,
  buttonStyle,
  buttonTextStyle,
  buttonText = "Confirm",
  highlightedItemStyle,
}: MonthYearPickerProps) => {
  const maxDateToCheck = new Date(maxDate);
  const minDateToCheck = new Date(minDate);
  // years array
  const yearsData: Array<number> = getYears({ maxDate, minDate });

  // highlighted year
  const [higlightedYear, setHighlightedYear] = useState<number>(
    yearsData.length - 1
  );

  // highlighted month
  const [highlightedMonth, setHighlightedMonth] = useState<number>(
    getMonthsData().length - 1
  );

  // days array
  const daysData: Array<number> = getDaysInMonth({
    month: getMonthsData()[highlightedMonth]?.id,
    year: yearsData[higlightedYear],
  });

  // highlighted day

  const [highlightedMonthDay, setHighlightedMonthDay] = useState<number>(
    getDaysData().length - 1
  );

  // Check if the provided date is a valid date type

  if (isNaN(maxDateToCheck.getTime()) || isNaN(minDateToCheck.getTime())) {
    throw new Error("Date must be a valid date type");
  }

  // Check if the provided date is less/greater than the current date
  if (maxDateToCheck < minDateToCheck) {
    throw new Error("Max date must be greater than Min date");
  }

  // check for opacity error

  if (typeof opacity !== "number") {
    throw new Error("Opacity must be of type number");
  }

  // functions

  // get months array to display

  function getMonthsData() {
    if (maxDateToCheck.getFullYear() == minDateToCheck.getFullYear()) {
      return monthsArrayObj.slice(
        minDateToCheck.getMonth(),
        maxDateToCheck.getMonth() + 1
      );
    }
    if (maxDateToCheck.getFullYear() == yearsData[higlightedYear]) {
      return monthsArrayObj.slice(0, maxDateToCheck.getMonth() + 1);
    }

    if (minDateToCheck.getFullYear() == yearsData[higlightedYear]) {
      return monthsArrayObj.slice(minDateToCheck.getMonth());
    }

    return monthsArrayObj;
  }

  // only month strings in array
  const modifiedMonth = getMonthsData().map((item) => {
    return item.month;
  });

  // get days data from highlighted month
  function getDaysData() {
    if (
      maxDateToCheck.getFullYear() == yearsData[higlightedYear] &&
      maxDateToCheck.getMonth() == getMonthsData()[highlightedMonth]?.id
    ) {
      return daysData.slice(0, maxDateToCheck.getDate());
    }
    if (
      minDateToCheck.getFullYear() == yearsData[higlightedYear] &&
      minDateToCheck.getMonth() == getMonthsData()[highlightedMonth]?.id
    ) {
      return daysData.slice(minDateToCheck.getDate() - 1);
    }
    return daysData;
  }

  // set back to initial

  function backToDefault() {
    setHighlightedMonth(maxDateToCheck.getMonth());
    setHighlightedMonthDay(maxDateToCheck.getDate() - 1);
    setHighlightedYear(yearsData.length - 1);
  }

  useEffect(() => {
    if (visible == false) {
      backToDefault();
    }
  }, [visible]);

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
                data={getDaysData()}
                onScrollToIndex={setHighlightedMonthDay}
                highlightedItem={getDaysData()[highlightedMonthDay]}
                yScrollOffset={(getDaysData().length - 1) * 50}
                itemContainerStyle={itemContainerStyle}
                itemTextStyle={itemTextStyle}
                highlightedItemStyle={highlightedItemStyle}
              />
            )}
            {/* months flatlist */}
            <DateFlatList
              data={modifiedMonth}
              onScrollToIndex={(num) => {
                setHighlightedMonth(num);
              }}
              highlightedItem={modifiedMonth[highlightedMonth]}
              yScrollOffset={(modifiedMonth.length - 1) * 50}
              itemContainerStyle={itemContainerStyle}
              itemTextStyle={itemTextStyle}
              highlightedItemStyle={highlightedItemStyle}
            />
            {/* years flatlist */}
            <DateFlatList
              data={yearsData}
              onScrollToIndex={setHighlightedYear}
              highlightedItem={yearsData[higlightedYear]}
              yScrollOffset={(yearsData.length - 1) * 50}
              itemContainerStyle={itemContainerStyle}
              itemTextStyle={itemTextStyle}
              highlightedItemStyle={highlightedItemStyle}
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
                month: getMonthsData()[highlightedMonth].id,
                day:
                  showDays == false
                    ? undefined
                    : getDaysData()[highlightedMonthDay],
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
