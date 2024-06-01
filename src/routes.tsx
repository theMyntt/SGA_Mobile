import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";

export default function Router(): JSX.Element {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />   
        <Stack.Screen name="Home" component={HomePage} />   
      </Stack.Navigator>
    </NavigationContainer>
  )
}