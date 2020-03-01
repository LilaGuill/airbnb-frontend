import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, Text } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView, { Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/core";

const AroundScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState();
  const navigation = useNavigation();

  // modifier avec useCallback()

  const getLocation = useCallback(async () => {
    // 1. Demander la permission d'accéder aux coordonnées GPS
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Permission refusée");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // 2. appeler une api et preciser latitude longitude
      const response = await fetch(
        `https://airbnb-api.herokuapp.com/api/room/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
      );
      const json = await response.json();
      setMarkers(json);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      {isLoading === false ? (
        <MapView
          showsUserLocation={true}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2
          }}
        >
          {markers.map((marker, index) => {
            return (
              <MapView.Marker
                key={marker._id}
                coordinate={{
                  latitude: marker.loc[1],
                  longitude: marker.loc[0]
                }}
                title={marker.title}
                description={marker.description}
              >
                <Callout
                  onPress={() => {
                    navigation.navigate(
                      "Room",
                      { id: marker._id },
                      { screen: "Room" }
                    );
                  }}
                >
                  <Text>{marker.title}</Text>
                </Callout>
              </MapView.Marker>
            );
          })}
        </MapView>
      ) : null}
    </>
  );
};

export default AroundScreen;
