import React, { useState } from "react";
import axios from "axios";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function SignUpScreen({ setToken, setUserId }) {
  const [email, setEmail] = useState("lila@gmail.com");
  const [username, setUsername] = useState("lila");
  const [name, setName] = useState("lila");
  const [description, setDescription] = useState("Vive les vacances!");
  const [password, setPassword] = useState("lilampd");
  const [confirmPassword, setconfirmPassword] = useState("lilampd");

  const handlePress = async () => {
    const response = await axios.post(
      "https://express-airbnb-api.herokuapp.com/user/sign_up",
      { email, username, name, description, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.title}>Rejoignez-nous !</Text>
        <View style={styles.form}>
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="name"
            value={name}
            onChangeText={text => setName(text)}
          />

          <TextInput
            placeholderTextColor="white"
            style={styles.textarea}
            placeholder="présentez-vous en quelques mots"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={text => setDescription(text)}
          />

          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="mot de passe"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="confirmez le mot de passe"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={text => setconfirmPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
            handlePress();
          }}
        >
          <Text>S'incrire</Text>
        </TouchableOpacity>
        <Text>Déjà un compte ? Se connecter</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#FF5A5E"
  },
  container: {
    alignItems: "center"
  },
  title: {
    marginTop: 100,
    fontSize: 20,
    color: "white"
  },

  input: {
    borderBottomColor: "#efeae5",
    borderBottomWidth: 1,
    height: 40,
    fontSize: 16,
    color: "white",
    width: "80%",
    paddingLeft: 5
  },
  textarea: {
    borderColor: "#efeae5",
    borderWidth: 1,
    color: "white",
    width: "80%",
    height: 100,
    paddingLeft: 5
  },
  btn: {
    backgroundColor: "white",
    width: 180,
    height: 54,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtn: {
    color: "#FF5A5E",
    fontSize: 24
  },
  text: {
    color: "#efeae5",
    textDecorationLine: "underline"
  }
});
