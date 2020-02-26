import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Map from "../components/Map";

const Localisation = ({ flatLatitude, flatLongitude }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    permissions();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Map flatLatitude={flatLatitude} flatLongitude={flatLongitude} />
        </>
      )}
    </View>
  );
};

export default Localisation;
