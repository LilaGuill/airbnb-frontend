import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageUser from "../components/ImageUser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

export default function ProfilScreen({ setUserToken, userToken, userId }) {
  console.log(userId);
  const id = "5e57b7133a162e0017c87968";
  const [isLoading, setIsLoading] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/user/" + userId,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      setName(response.data.name);
      setEmail(response.data.email);
      setUsername(response.data.username);
      setDescription(response.data.description);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const response = await axios.put(
      "https://express-airbnb-api.herokuapp.com/user/update/" + userId,
      { email, description, username, name },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json"
        }
      }
    );
    setName(response.data.name);
    setEmail(response.data.email);
    setUsername(response.data.username);
    setDescription(response.data.description);
  };

  return (
    <>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: Constants.statusBarHeight,
              backgroundColor: "white"
            }}
            scrollEnabled
          >
            <ImageUser
              image={image}
              setImage={setImage}
              userToken={userToken}
              userId={userId}
            />
            <TextInput
              value={name}
              style={styles.input}
              onChangeText={text => setName(text)}
            />
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              value={username}
              style={styles.input}
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              value={description}
              style={styles.textarea}
              onChangeText={text => setDescription(text)}
            />

            <TouchableOpacity
              style={styles.submit}
              onPress={() => handleUpdate()}
            >
              <Text style={styles.textSubmit}> Mettre à jour</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setUserToken(null)}
              style={styles.logout}
            >
              <Text style={styles.textLogout}>Se déconnecter</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "gray"
  },
  input: {
    width: "90%",
    height: 60,
    borderBottomColor: "#FF495A",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    fontSize: 16
  },
  submit: {
    marginTop: 20,
    borderColor: "#FF495A",
    borderWidth: 2,
    height: 44,
    width: 150,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  textSubmit: {
    color: "#FF495A",
    fontSize: 16
  },
  logout: {
    marginTop: 20,
    backgroundColor: "#FF495A",
    height: 44,
    width: 200,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  textLogout: {
    fontSize: 18,
    color: "white"
  },
  textarea: {
    borderColor: "#FF495A",
    marginTop: 20,
    borderWidth: 1,
    width: "90%",
    height: 100,
    paddingLeft: 5,
    fontSize: 16
  }
});
