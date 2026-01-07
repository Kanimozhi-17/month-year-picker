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
  defaultvalue = `${new Date().getFullYear()}-${new Date().toLocaleString("en-US" , {month : 'short'})}-${new Date().getDate()}`,
  opacity = 0.5,
  containerStyle,
  modalContainer,
  wholeContainer,
  maxDate = new Date().toISOString(),
  minDate = "2000-01-01",
  onConfirm,
  showDays = true,
  showMonth = true,
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
  const defaultDisplayDate = defaultvalue?.split("-")
  // years array
  const yearsData: Array<number> = getYears({ maxDate, minDate });
  // highlighted year
  const [higlightedYear, setHighlightedYear] = useState<number>(() => {
  const year = Number(defaultDisplayDate[0]);
  const index = yearsData.indexOf(year);
  return index !== -1 ? index : yearsData.length - 1;
});

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

  function getMonthsDataForYear(year: number) {
  if (maxDateToCheck.getFullYear() === minDateToCheck.getFullYear()) {
    return monthsArrayObj.slice(minDateToCheck.getMonth(), maxDateToCheck.getMonth() + 1);
  }
  if (year === maxDateToCheck.getFullYear()) {
    return monthsArrayObj.slice(0, maxDateToCheck.getMonth() + 1);
  }
  if (year === minDateToCheck.getFullYear()) {
    return monthsArrayObj.slice(minDateToCheck.getMonth());
  }
  return monthsArrayObj;
}

  // Highlighted month
const [highlightedMonth, setHighlightedMonth] = useState<number>(() => {
  const year = Number(defaultDisplayDate[0]);
  const monthStr = defaultDisplayDate[1];
  const months = getMonthsDataForYear(year);
  const index = months.findIndex(m => m.month === monthStr);
  return index !== -1 ? index : months.length - 1;
});

  const monthObj = getMonthsData()[highlightedMonth];

  const daysData: number[] = getDaysInMonth({
    month: monthObj?.id ?? 1,
    year: yearsData[higlightedYear],
  });

   // get days data from highlighted month
  function getDaysData() {
    const monthObj = getMonthsData()[highlightedMonth];
    if (!monthObj) return [];
    const selectedYear = yearsData[higlightedYear];
    const selectedMonth = monthObj.id;
      if (
      selectedYear === maxDateToCheck.getFullYear() &&
      selectedMonth === maxDateToCheck.getMonth() + 1
      ) {
        return daysData.slice(0, maxDateToCheck.getDate());
      }

      if (
      selectedYear === minDateToCheck.getFullYear() &&
      selectedMonth === minDateToCheck.getMonth() + 1
      ) {
        return daysData.slice(minDateToCheck.getDate() - 1);
      }

    return daysData;
  }

  // highlighted day
  const days = getDaysData();

// Highlighted day
const [highlightedMonthDay, setHighlightedMonthDay] = useState<number>(() => {
  const day = Number(defaultDisplayDate[2]);
  const months = getMonthsDataForYear(Number(defaultDisplayDate[0]));
  const monthObj = months.find(m => m.month === defaultDisplayDate[1]);
  const monthDays = getDaysInMonth({ month: monthObj?.id ?? 1, year: Number(defaultDisplayDate[0]) });
  return Math.min(day - 1, monthDays.length - 1);
});

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


  // only month strings in array
  const modifiedMonth = getMonthsData().map((item) => {
    return item.month;
  });

  //get display value from value

  

 

  // set back to initial

 function backToDefault() {
  const [yearStr, monthStr, dayStr] = defaultDisplayDate;

  const year = Number(yearStr);
  const day = Number(dayStr);

  // Reset year
  const yearIndex = yearsData.indexOf(year);
  setHighlightedYear(yearIndex !== -1 ? yearIndex : yearsData.length - 1);

  // Reset month
  const months = getMonthsDataForYear(year);
  const monthIndex = months.findIndex(m => m.month === monthStr);
  setHighlightedMonth(monthIndex !== -1 ? monthIndex : 0);

  // Reset day
  const monthObj = months[monthIndex] ?? months[0];
  const monthDays = getDaysInMonth({ month: monthObj?.id ?? 1, year });
  setHighlightedMonthDay(Math.min(day - 1, monthDays.length - 1));
}



  useEffect(() => {
    if (visible == false) {
      backToDefault();
    }
  }, [visible]);

  useEffect(() => {
  if (highlightedMonthDay >= days.length) {
    setHighlightedMonthDay(days.length - 1);
  }
}, [highlightedMonth, higlightedYear]);

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
    <View style={wholeContainer}>
      <View style={[styles.modalContainer, modalContainer]}>
        <View style={[styles.containerStyle, containerStyle, { height: 250 }]}>
          <View style={styles.innerContainer}>
            {/* days flatlist */}
            {showDays == true && (
              <DateFlatList
                data={days}
                value={Number(defaultDisplayDate[2])}
                onScrollToIndex={setHighlightedMonthDay}
                highlightedItem={days[highlightedMonthDay]}
                yScrollOffset={days.length ? (days.length - 1) * 50 : 0}
                itemContainerStyle={itemContainerStyle}
                itemTextStyle={itemTextStyle}
                highlightedItemStyle={highlightedItemStyle}
              />
            )}
            {/* months flatlist */}
            { showMonth && <DateFlatList
              data={modifiedMonth}
              value={defaultDisplayDate[1].trim()}
              onScrollToIndex={(num) => {
                setHighlightedMonth(num);
              }}
              highlightedItem={modifiedMonth[highlightedMonth]}
              yScrollOffset={(modifiedMonth?.length - 1) * 50}
              itemContainerStyle={itemContainerStyle}
              itemTextStyle={itemTextStyle}
              highlightedItemStyle={highlightedItemStyle}
            /> }
            {/* years flatlist */}
            <DateFlatList
              data={yearsData}
              onScrollToIndex={setHighlightedYear}
              value={Number(defaultDisplayDate[0])}
              highlightedItem={yearsData[higlightedYear]}
              yScrollOffset={(yearsData?.length - 1) * 50}
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
                month: getMonthsData()[highlightedMonth].id ?? 1,
                day:
                  showDays == false
                    ? undefined
                    : days[highlightedMonthDay],
              })
            );
          }}
        />
      </View>
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
