import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens";
import { DetailsScreen } from "@/screens/home/DetailsScreen";

const { Navigator, Screen } = createNativeStackNavigator();
export const HomeStack = () => {
  return (
    <Navigator>
      <Screen
        name="HomeStack"
        component={HomeScreen as any}
        options={{
          headerTransparent: true,
          headerLargeStyle: {
            backgroundColor: "black",
          },
          headerTitle: "Discover",
          headerLargeTitleShadowVisible: true,
          headerBlurEffect: "systemUltraThinMaterialDark",
          headerLargeTitle: true,
          headerTintColor: "#fff",
        }}
      />
      <Screen
        name="DetailStack"
        component={DetailsScreen as any}
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Navigator>
  );
};
