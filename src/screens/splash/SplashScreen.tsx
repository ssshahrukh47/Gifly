import React, { useEffect } from 'react';
import { View, StatusBar, Text } from 'react-native';
import styles from './Styles';
import Strings from '../../res/strings';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Image } from 'expo-image';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <Image
        source={require('../../../assets/background.jpg')}
        style={styles.image}
      />

      <View style={styles.overlay}>
        <Text style={styles.appName}>{Strings.GIFLY}</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
