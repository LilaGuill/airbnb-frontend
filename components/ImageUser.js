import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageUser = ({ userToken, userId }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const updatePicture = async () => {
    const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // Choisir camera ou camera roll
    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      // enregistre la photo dans la base de donnée
      const uri = pickerResult.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append("photo", {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`
      });
      const options = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + userToken,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      };

      try {
        const response = await fetch(
          "https://express-airbnb-api.herokuapp.com/user/upload_picture/" +
            userId,
          options
        );
        const uploadResult = await response.json();

        setUser(uploadResult);
      } catch (error) {
        alert(error.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading === false ? (
        <TouchableOpacity onPress={() => updatePicture()}>
          <Image style={styles.image} source={{ uri: user.photo[0].url }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => updatePicture()}>
          <Image style={styles.image} source={require("../assets/user.png")} />
        </TouchableOpacity>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "gray"
  }
});
export default ImageUser;
