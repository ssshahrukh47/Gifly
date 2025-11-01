import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./stacks/AppStack";

const ApplicationNavigator = () => {
    return (
      <NavigationContainer>
         <AppNavigator/>
      </NavigationContainer>
    );
  };
  
  export default ApplicationNavigator;