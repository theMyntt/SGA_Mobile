import { View, Text, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginPageRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation?: LoginPageNavigationProp;
  route?: LoginPageRouteProp;
};

export default function LoginPage({ navigation }: Props): JSX.Element {
  return (
    <View>
      <Text>Open up Ap.tsx to start working on your app!</Text>
      <Button title="Ir pro home" onPress={() => navigation?.navigate("Home")}/>
    </View>
  )
}