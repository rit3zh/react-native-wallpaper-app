import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from "../../screens";
import { DetailsScreen } from "@/screens/home/DetailsScreen";

const { Navigator, Screen } = createNativeStackNavigator();
export const SearchStack = () => {
  return (
    <Navigator>
      <Screen
        name="SearchStack"
        component={SearchScreen as any}
        options={{
          title: "Search",
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
