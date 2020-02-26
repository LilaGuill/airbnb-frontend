import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Rating({ rate }) {
  const ratingArray = [];
  for (let i = 1; i <= 5; i++) {
    if (i > rate) {
      ratingArray.push(
        <Ionicons
          key={i}
          name="md-star"
          size={24}
          color="#B7B6AE"
          style={styles.icon}
        />
      );
    } else {
      ratingArray.push(
        <Ionicons
          key={i}
          name="md-star"
          size={24}
          color="gold"
          style={styles.icon}
        />
      );
    }
  }
  return ratingArray;
}

const styles = StyleSheet.create({
  icon: {
    margin: 5
  }
});
