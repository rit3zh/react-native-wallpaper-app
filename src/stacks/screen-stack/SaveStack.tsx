import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SaveScreen } from "../../screens";
import { DetailsScreen } from "@/screens/home/DetailsScreen";

const { Navigator, Screen } = createNativeStackNavigator();
export const SaveStack = () => {
  return (
    <Navigator>
      <Screen
        name="SaveStack"
        component={SaveScreen as any}
        options={{
          title: "Saves",
          headerLargeTitle: true,

          headerTransparent: true,
          headerLargeStyle: {
            backgroundColor: "black",
          },
          headerLargeTitleShadowVisible: true,
          headerBlurEffect: "systemUltraThinMaterialDark",
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
