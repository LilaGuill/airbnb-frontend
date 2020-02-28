import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Map from "../components/Map";
import axios from "axios";

const AroundScreen = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState();
  console.log(markers);
  // modifier avec useCallback()
  useEffect(() => {
    const permissions = async () => {
      try {
        const response = await Permissions.askAsync(Permissions.LOCATION);
        if (response.status !== "granted") {
          setErrorMessage("Permission refusée");
        } else {
          const location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
          // appeler ici la requete pour récuperer les coords
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchData = async () => {
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/around?latitude=${latitude}&longitude=${longitude}`
      );
      setMarkers(response.data);
    };
    console.log(markers);
    permissions();
    if (latitude && longitude) {
      fetchData();
    }
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Map
            latitude={latitude}
            longitude={longitude}
            height={"100%"}
            markers={markers}
          />
        </>
      )}
    </View>
  );
};

export default AroundScreen;
