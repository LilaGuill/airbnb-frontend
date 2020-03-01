import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import HomeScreen from "./containers/HomeScreen";
import AroundScreen from "./containers/AroundScreen";
import RoomScreen from "./containers/RoomScreen";
import ProfilScreen from "./containers/ProfilScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async userToken => {
    if (userToken) {
      AsyncStorage.setItem("userToken", userToken);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(userToken);
  };

  const setId = async id => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };
  useEffect(() => {
    //vérifcation du token
    const CheckToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);

      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);

      setIsLoading(false);
    };
    CheckToken();
  }, []);

  useEffect(() => {
    //vérifcation du token
    const CheckId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);
      setIsLoading(false);
    };
    CheckId();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setUserToken={setUserToken} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {() => <SignUpScreen setUserToken={setUserToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        //user is signed in
        //container des stacks
        <Stack.Navigator>
          {/* stack generale */}
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              // tab.navigator contient tout les screen
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "black",
                  inactiveTintColor: "white",
                  style: {
                    backgroundColor: "#FF495A"
                  }
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    //le screen home, around, profil
                    <Stack.Navigator>
                      <Stack.Screen
                        options={{
                          title: "MonAirbnb",
                          headerStyle: {
                            backgroundColor: "#FF495A"
                          },
                          headerTitleStyle: { color: "white" }
                        }}
                        name="Home"
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                          headerStyle: { backgroundColor: "#FF495A" },
                          headerTitleStyle: { color: "white" }
                          // headerBackTitleVisible:false
                          //headerBackTitleVisible:false
                        }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Around"
                  options={{
                    tabBarLabel: "Around",
                    tabBarIcon: ({ color, size }) => (
                      <EvilIcons name={"location"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Around"
                        options={{
                          title: "Around",
                          headerStyle: { backgroundColor: "#FF495A" },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {() => <AroundScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Profil"
                  options={{
                    tabBarLabel: "Profil",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name={"user"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <ProfilScreen
                      userToken={userToken}
                      setUserToken={setUserToken}
                      userId={userId}
                    />
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: "blue",
    justifyContent: "center",
    alignItems: "center"
  }
});
