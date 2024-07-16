import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeStack, SaveStack, SearchStack } from "../screen-stack/_index";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { AnimatedFade } from "@/components/index";
import { useState } from "react";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import hasNotch from "@/core/hasNotch";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
const { Screen, Navigator } = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const [name, setName] = useState<string>();
  const [homeName, setHomeName] = useState<string>();
  const [saveName, setSaveName] = useState<string>();

  return (
    <Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          popToTopOnBlur: true,

          animation: "shift",
          tabBarStyle: {
            position: "absolute",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          tabBarShowLabel: false,
          tabBarIconStyle: {
            marginTop: hasNotch() ? 10 : 5,
          },

          tabBarBackground: () => (
            <BlurView
              intensity={80}
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",

                backgroundColor: "transparent",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            />
          ),
        };
      }}
      tabBar={(props) => (
        <AnimatedFade
          visible={
            homeName === "DetailStack"
              ? false
              : name === "DetailStack"
              ? false
              : saveName === "DetailStack"
              ? false
              : true
          }
        >
          <BottomTabBar {...props} />
        </AnimatedFade>
      )}
    >
      <Screen
        name="HomeScreenStack"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          setHomeName(routeName);
          return {
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "white" : "gray"}
                size={size}
              />
            ),
          };
        }}
        component={HomeStack}
      />
      <Screen
        name="SearchScreenStack"
        component={SearchStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          setName(routeName);
          return {
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={focused ? "white" : "gray"}
                size={size}
              />
            ),
          };
        }}
      />
      <Screen
        name="SaveScreenStack"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          setSaveName(routeName);
          return {
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "download" : "download-outline"}
                size={size}
                color={focused ? "white" : "gray"}
              />
            ),
          };
        }}
        component={SaveStack}
      />
    </Navigator>
  );
};
