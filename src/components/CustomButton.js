import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const CustomButton = (props) => {

  
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? props.pressedButtonColor
            : props.buttonColor,
          marginTop: 10,
          flex:props.flexValue,
          width:props.setWidth,
        },
        styles.buttonStyle,
      ]}
      onPress={() => props.onPress()}
    >
      <Text style={styles.buttonText}>{props.buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,

    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
