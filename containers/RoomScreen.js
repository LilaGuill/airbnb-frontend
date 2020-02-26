import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/core";
import Swiper from "react-native-swiper";
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

  // const listPhotos = flat.photos.map((photo, index) => {
  // //   return <Image source={{ uri: photo }} style={styles.image} />;
  // // });
  return (
    <ScrollView>
      {isLoading === true ? (
        <View>
          <Text>Loading</Text>
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
          <Text>{flat.description}</Text>

          <Map latitude={flat.loc[1]} longitude={flat.loc[0]} height={200} />
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
    fontSize: 16,
    color: "#302017",
    marginTop: 5
  },
  rate: {
    flexDirection: "row"
  }
});

export default RoomScreen;
