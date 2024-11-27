import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, autoLogin } from "../redux/userSlice";
import { CustomTextInput, CustomButton, Loading } from "../components";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin())
      .unwrap()
     
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      navigation.replace("HomePage"); // Oturum açılmışsa yönlendir
    }
  }, [isAuth, navigation]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Email and password cannot be empty.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.welcome}>Welcome</Text>
      <Image
        source={require("../../assets/images/login.png")}
        style={styles.image}
      />
      <CustomTextInput
        title="Email"
        isSecureText={false}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        value={email}
        placeholder="Enter your email"
      />
      <CustomTextInput
        title="Password"
        isSecureText={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
        placeholder="Enter your password"
      />
      <Text style={{ color: "red", marginVertical: 10 }}>
        {error ? "Login failed. Please check your email and password." : ""}
      </Text>
      <CustomButton
        buttonText="Login"
        setWidth="80%"
        onPress={handleLogin}
        buttonColor="blue"
        pressedButtonColor="gray"
      />
      <CustomButton
        buttonText="Sign up"
        setWidth="30%"
        onPress={() => navigation.navigate("Signup")}
        buttonColor="gray"
        pressedButtonColor="lightgrey"
      />
      {isLoading && <Loading />}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
    color: "white",
  },
});
