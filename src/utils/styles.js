import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row"
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    flex: 1
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  row: {
    paddingVertical: 8,
    flexDirection: "row"
  },
  key: {
    fontSize: 18,
    flex: 1
  },
  value: {
    fontSize: 18,
    marginRight: 10,
    textAlign: "right",
    flex: 1
  },
  input: {
    fontSize: 18,
    marginRight: 10,
    flex: 1,
    textAlign: "right",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 5
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
