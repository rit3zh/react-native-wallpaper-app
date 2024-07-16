import { StatusBar, Dimensions, Platform } from "react-native";

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get("window");

const hasNotch = () => {
  if (Platform.OS === "ios") {
    const iosDevicesWithNotches = [
      { width: 375, height: 812 },
      { width: 414, height: 896 },
      { width: 390, height: 844 },
      { width: 428, height: 926 },
      { width: 430, height: 932 },
      { width: 393, height: 852 },
    ];

    return iosDevicesWithNotches.some(
      (device) => device.width === D_WIDTH && device.height === D_HEIGHT
    );
  } else if (Platform.OS === "android") {
    const statusBarHeight = StatusBar.currentHeight || 0;
    return statusBarHeight > 24;
  }
  return false;
};

export default hasNotch;
