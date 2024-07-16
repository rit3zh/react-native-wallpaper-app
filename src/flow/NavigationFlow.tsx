import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "../stacks";

const { Navigator, Screen } = createNativeStackNavigator();

export const NavigationFlow = () => {
  return (
    <Navigator>
      <Screen
        name="Home"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
    </Navigator>
  );
};
