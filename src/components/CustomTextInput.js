import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const CustomTextInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputBoxText}>{props.title}</Text>
      <TextInput
      value={props.value}
        secureTextEntry={props.isSecureText}
        placeholder={props.placeholder}
        placeholderTextColor="white"
        onChangeText={props.onChangeText}
        style={styles.textInput}
      ></TextInput>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 0.5,
    borderColor: "white",
    fontWeight: "bold",
    color: "white",
    
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: "center",
  },
  inputBoxText: {
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    width: "80%",
  },
});
