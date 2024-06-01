import { View, Text, Button } from "react-native";

export default function LoginPage({ navigation }): JSX.Element {
  return (
    <View>
      <Text>Open up Ap.tsx to start working on your app!</Text>
      <Button title="Ir pro home" onPress={() => navigation.navigate("Home")}/>
    </View>
  )
}