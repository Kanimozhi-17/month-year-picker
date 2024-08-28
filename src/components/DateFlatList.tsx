import { FlatList, Text, View } from "react-native";
import React from "react";
import { DateFlatListProps } from "../typings";
import styles from "../styles";

export const DateFlatList = ({
  data,
  onScrollToIndex,
  yScrollOffset,
  highlightedItem,
  itemTextStyle,
  itemContainerStyle,
  highlightedItemStyle,
}: DateFlatListProps) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        onScroll={(event) => {
          const scrollOffset = event.nativeEvent.contentOffset.y;
          onScrollToIndex(Math.round(scrollOffset / 50));
        }}
        contentOffset={{ x: 0, y: yScrollOffset }}
        data={data}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View
            style={[styles.itemContainer, itemContainerStyle, { height: 50 }]}
          >
            <Text
              style={[
                styles.itemText,
                itemTextStyle,
                highlightedItem == item &&
                  (highlightedItemStyle || {
                    fontSize: 20,
                    fontWeight: "500",
                  }),
              ]}
            >
              {typeof item == "number" && item < 10 ? "0" + item : item}
            </Text>
          </View>
        )}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        snapToInterval={50}
        decelerationRate={"fast"}
      />
    </View>
  );
};
