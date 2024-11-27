import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage, SignupPage } from "../screens";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import app from "../../firebaseConfig";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const { isAuth } = useSelector((state) => state.user);
  console.log("isAuth değeri:", isAuth); // Debug
  return (
    <NavigationContainer>
      {!isAuth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
    
  );
};

export default RootNavigation;
