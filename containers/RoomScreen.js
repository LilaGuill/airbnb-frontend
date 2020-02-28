import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/core";

import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import ImageItem from "../components/ImageItem";
import Rating from "../components/Rating";
import Map from "../components/Map";

const RoomScreen = () => {
  const [flat, setFlat] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useRoute();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room/" + id
      );

      setFlat(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      {isLoading === true ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <ImageItem uri={flat.photos[0]} price={flat.price} />
          <Text style={styles.title} numberOfLines={1}>
            {flat.title}
          </Text>
          <View style={styles.rate}>
            <Rating rate={flat.ratingValue} />
          </View>
          <Text style={styles.description}>{flat.description}</Text>
          <Map latitude={flat.loc[1]} longitude={flat.loc[0]} height={300} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  title: {
    fontSize: 20,
    color: "#302017",
    marginHorizontal: 10,
    marginVertical: 5
  },
  description: {
    marginHorizontal: 10,
    fontSize: 16,
    marginVertical: 10
  },
  rate: {
    flexDirection: "row"
  }
});

export default RoomScreen;
