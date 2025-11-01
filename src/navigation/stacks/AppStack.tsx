import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from '../../../src/screens/splash/SplashScreen';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { FeedbackScreen } from '../../screens/feedback/FeedbackScreen';
import { RootStackParamList } from '../../types';

const AppStack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Splash" component={SplashScreen} />
        <AppStack.Screen name="Home" component={HomeScreen} />
        <AppStack.Screen name="Feedback" component={FeedbackScreen} />
      </AppStack.Navigator>
    );
  };

export default AppNavigator;
