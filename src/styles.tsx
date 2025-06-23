import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    // position: "absolute",
    // bottom: 30,
  },
  containerStyle: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
  },
  ConfirmButtonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    top: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    color: "#fff",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  highlighter: {
    height: 50,
    top: 100,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "absolute",
    zIndex: -1,
  },
  itemContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  itemText: {
    fontSize: 16,
    color: "#000",
  },
  listContainer: {
    paddingBottom: 100,
    paddingTop: 100,
  },
  absolutePressItem: { position: "absolute", height: "100%", paddingHorizontal: 25, marginHorizontal: "auto" },
});
