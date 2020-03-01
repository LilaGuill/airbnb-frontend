import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setUserToken, setId }) {
  const [email, setEmail] = useState("lila@gmail.com");
  const [password, setPassword] = useState("lilampd");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handlePress = async () => {
    // try catch
    setIsLoading(true);

    const response = await axios.post(
      "https://express-airbnb-api.herokuapp.com/user/log_in",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    setIsLoading(false);
    setUserToken(response.data.token);
    setId(response.data.id);
  };

  return (
    <View style={styles.container}>
      {/* //modifie les icons du haut du screen */}
      <StatusBar barStyle={"light-content"} />
      <View style={styles.wrapper}>
        <AntDesign name="home" size={72} color="white" />
      </View>
      <KeyboardAwareScrollView
        scrollEnabled
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 20
        }}
      >
        <TextInput
          autoCapitalize="none"
          color="white"
          value={email}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={text => {
            setEmail(text);
          }}
        />

        <TextInput
          color="white"
          value={password}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={text => {
            setPassword(text);
          }}
        />

        {/* {isLoading} */}
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              handlePress();
            }}
          >
            <Text style={styles.textBtn}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.text}>Pas de compte ? S'incrire</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF5A5E", //FF495A
    flex: 1,
    alignItems: "center"
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapperBtn: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%"
  },
  input: {
    borderBottomColor: "#efeae5",
    borderBottomWidth: 1,
    height: 44,
    fontSize: 16,
    marginBottom: 30
  },
  btn: {
    backgroundColor: "white",
    width: 180,
    height: 54,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  textBtn: {
    color: "#FF5A5E",
    fontSize: 20
  },
  text: {
    color: "#efeae5",
    textDecorationLine: "underline",
    marginTop: 20
  }
});
