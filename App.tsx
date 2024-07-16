import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { NavigationFlow } from "./src/flow/NavigationFlow";
import { Appearance } from "react-native";
Appearance.setColorScheme("dark");
export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <NavigationFlow />
    </NavigationContainer>
  );
}
