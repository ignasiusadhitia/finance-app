import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import TransactionFormScreen from "../screens/TransactionFormScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Homes">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen
        name="Transaction Form"
        component={TransactionFormScreen}
        options={({ route }) => ({
          title: route.params?.transaction
            ? "Edit Transaction"
            : "New Transaction",
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
