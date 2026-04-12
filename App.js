import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Game from "./screens/Game";
import Tutorial from "./screens/Tutorial";
import Historia from "./screens/Historia";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Game" component={Game}/>
        <Stack.Screen name="Tutorial" component={Tutorial}/>
        <Stack.Screen name="Historia" component={Historia}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}