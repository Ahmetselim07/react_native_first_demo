import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import TextInput, {
  CustomButton,
  CustomTextInput,
  Loading,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/userSlice";

const SignupPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);

  const handleRegister = () => {
    dispatch(register({ email, password }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.title}>
              <Image
                style={styles.image}
                source={require("../../assets/images/sign_up.png")}
              />
              <Text style={styles.signUp}>Sign Up</Text>
            </View>

            <View style={styles.textInputContainer}>
              <CustomTextInput
                title="Name"
                isSecureText={false}
                onChangeText={setName}
                value={name}
                placeholder="Enter Your Name"
              />
              <CustomTextInput
                title="Email"
                isSecureText={false}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter Your Email"
              />
              <CustomTextInput
                title="Password"
                isSecureText={true}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter Your Password"
              />
            </View>
            <View style={styles.signUpOptions}>
              <CustomButton
                buttonText="Sign Up"
                setWidth="80%"
                buttonColor="blue"
                pressedButtonColor="lightgrey"
                onPress={() => handleRegister()}
              />
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>
                  Already have an account? Login
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    paddingTop: 30,
  },
  signUp: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
    color: "white",
  },
  textInputContainer: {
    flex: 2,
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpOptions: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
});
