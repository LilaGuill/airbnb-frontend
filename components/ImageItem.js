import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

const ImageItem = ({ uri, price }) => {
  console.log("photoss", uri);
  return (
    <View style={styles.wrapperImage}>
      <Image source={{ uri: uri }} style={styles.image} />
      {/* image backgroundColor */}
      <View style={styles.price}>
        <Text style={styles.text}>{price} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperImage: {
    flex: 1,
    position: "relative"
  },
  price: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#302017",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: 250
  },
  text: {
    color: "white"
  }
});

export default ImageItem;
