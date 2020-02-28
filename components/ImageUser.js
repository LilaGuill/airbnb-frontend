import React, { useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from "axios";

const ImageUser = ({ image, setImage, userToken, userId }) => {
  console.log(userId, userToken);
  const updatePicture = async () => {
    // demander permission
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // selectionner photo
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      // console.log(pickerResult);
      setImage(pickerResult.uri);
      // enregistre dans la base de donnée
      const savePicture = async () => {
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
        console.log(options);
        try {
          const response = await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/upload_picture/" +
              userId,
            options
          );
          console.log(response);
        } catch (error) {
          alert(error.message);
        }
      };
      savePicture();
    }
  };

  return (
    <>
      {image ? (
        <TouchableOpacity onPress={() => updatePicture()}>
          <Image style={styles.image} source={{ uri: image }} />
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
