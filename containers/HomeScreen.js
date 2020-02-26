import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import axios from "axios";
import Rating from "../components/Rating";
import ImageItem from "../components/ImageItem";
const HomeScreen = () => {
  const [flats, setFlats] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setFlats(response.data.rooms);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const navigation = useNavigation();
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      {isLoading === true ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={[...flats]}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(
                  "Room",
                  { id: item._id },
                  { screen: "Room" }
                );
              }}
            >
              <View style={styles.wrapperFlat}>
                <ImageItem uri={item.photos[0]} price={item.price} />

                <View style={styles.wrapperDescription}>
                  <View style={styles.wrapperRating}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View style={styles.rating}>
                      <View style={styles.rate}>
                        <Rating rate={item.ratingValue} />
                      </View>
                      <Text style={styles.reviews}>{item.reviews} avis</Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: item.user.account.photos[0] }}
                    style={styles.profil}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* <View style={styles.wrapper}>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  wrapperFlat: {
    flex: 1,
    margin: 20
  },

  wrapperDescription: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#B7B6AE",
    borderBottomWidth: 2
  },
  wrapperRating: {
    width: "80%"
  },
  title: {
    fontSize: 16,
    color: "#302017",
    marginTop: 5
  },
  rating: {
    flexDirection: "row",
    alignItems: "center"
  },
  rate: {
    flexDirection: "row"
  },
  reviews: {
    color: "#B7B6AE",
    fontSize: 14,
    marginLeft: 15
  },

  text: {
    color: "white",
    fontSize: 18
  },

  profil: {
    width: 60,
    height: 60,
    borderRadius: 30
  }
});

export default HomeScreen;
