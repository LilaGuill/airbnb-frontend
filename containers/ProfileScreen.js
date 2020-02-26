import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const { params } = useRoute();
  {
    /* <ScrollView></ScrollView> on doit remplace style={} par contentContainerStyle={} */
  }

  return (
    <View>
      <Text>user id : {params.userId}</Text>
    </View>
  );
}
