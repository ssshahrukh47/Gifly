import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/stacks/AppStack';

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
       <AppNavigator/>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
