import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import * as Media from "expo-media-library";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { ISearch } from "pinterest.js";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
import { Header, HeaderBackButton } from "@react-navigation/elements";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import { downloadImage } from "@/core/downloadImage";
import {
  createTable,
  saveWallpaper,
  getWallpapers,
  deleteWallpaper,
} from "@/db/DBFlow";
import hasNotch from "@/core/hasNotch";

export const DetailsScreen = (props?: NativeStackHeaderProps) => {
  const params: ISearch | undefined = props?.route.params;

  const [permissionResponse, requestPermission] = Media.usePermissions();
  const [alreadySave, setAlreadySave] = useState<boolean>(false);
  const onBackPress = () =>
    props?.navigation.canGoBack() ? props?.navigation.goBack() : null;

  useLayoutEffect(() => {
    const setupDB = async () => {
      await createTable();
    };
    const checkForSave = async () => {
      await filterWallpaper();
    };

    setupDB();
    checkForSave();
  }, []);

  const onDownloadPress = async () => {
    if (Platform.OS === "ios") {
      if (permissionResponse?.canAskAgain === false) {
        Media.requestPermissionsAsync().then(({ status }) => {
          const isAuthorized = status == "granted";
          if (!isAuthorized) {
            Linking.openSettings();
          }
        });
      } else if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }

      await downloadImage(params?.imageURL!);
    }
  };
  const onSavePress = async () => {
    const wallpapers = await getWallpapers();

    const filtered = wallpapers.filter((v) => v.url === params?.imageURL);
    if (filtered.length > 0) {
      Alert.alert(
        "Wallpaper Already Saved",

        "This wallpaper is already saved in your collection. Would you like to remove it?",
        [
          {
            style: "destructive",
            text: "Delete",
            isPreferred: true,
            onPress: async () => {
              await deleteWallpaper(filtered[0].id);
              setAlreadySave(false);
            },
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } else {
      saveWallpaper(params?.imageURL!);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Wallpaper Saved",
        textBody:
          "The wallpaper has been successfully saved to your collection.",
        titleStyle: {
          fontSize: 15,
        },
        autoClose: true,
      });
    }
  };

  const filterWallpaper = async () => {
    const wallpapers = await getWallpapers();
    const filtered = wallpapers.filter((v) => v.url === params?.imageURL);
    if (filtered.length > 0) {
      setAlreadySave(true);
    } else {
      setAlreadySave(false);
    }
  };

  return (
    <AlertNotificationRoot
      theme="dark"
      dialogConfig={{ autoClose: true, closeOnOverlayTap: true }}
    >
      <React.Fragment>
        <Animated.Image
          source={{ uri: params?.imageURL }}
          resizeMode={"cover"}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
        />
        <Animated.View entering={FadeInLeft.springify().delay(200)}>
          <Header
            title=""
            headerStyle={{
              backgroundColor: "transparent",
            }}
            headerLeft={() => (
              <HeaderBackButton
                tintColor="white"
                onPress={onBackPress}
                style={{
                  marginTop: hasNotch() ? 0 : 30,
                }}
              />
            )}
          />
        </Animated.View>
        <View className="w-full h-full justify-end">
          <View
            style={{
              marginBottom: responsiveHeight(20),
            }}
            className="ml-5 flex-row"
          >
            <TouchableWithoutFeedback onPress={onDownloadPress}>
              <Animated.View
                entering={FadeInDown.springify().delay(200)}
                className="w-[50px] h-[50px] bg-[#1f1e1e] rounded-full items-center justify-center"
              >
                <Ionicons name="cloud-download" size={24} color="white" />
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onSavePress}>
              <Animated.View
                entering={FadeInUp.springify().delay(400)}
                className="w-[50px] h-[50px] bg-[#1f1e1e]  ml-5 rounded-full items-center justify-center"
              >
                <Ionicons
                  name={alreadySave ? "checkmark-sharp" : "bookmark"}
                  size={24}
                  color="white"
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </React.Fragment>
    </AlertNotificationRoot>
  );
};
