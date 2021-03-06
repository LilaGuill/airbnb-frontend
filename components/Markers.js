import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Markers = ({ markers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    setIsLoading(false);
    setLat(lat);
    setLng(lng);
  }, []);

  //ajouter le callout
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
            // ajouter delta pour gerer le zoom
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          minZoomLevel={0}
          maxZoomLevel={16}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          {markers.map(marker => {
            return (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.loc[1],
                  longitude: marker.loc[0]
                }}
                title={marker.title}
                description={marker.description}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
};

export default Markers;
