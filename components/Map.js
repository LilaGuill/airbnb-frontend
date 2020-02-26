import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Map = ({ latitude, longitude, height, title, markers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    setLat(latitude);
    setLng(longitude);
    setIsLoading(false);
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          initialRegion={{
            latitude: lat,
            longitude: lng
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          minZoomLevel={0}
          maxZoomLevel={16}
          style={{
            width: "100%",
            height: height
          }}
        >
          {markers ? (
            markers.map(marker => {
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
            })
          ) : (
            <MapView.Marker
              title={title}
              coordinate={{
                latitude: lat,
                longitude: lng
              }}

              //   description={marker.description}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

export default Map;
