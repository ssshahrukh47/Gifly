import { StyleSheet } from "react-native";
import { COLORS } from "../../res/themes/colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    overlay: {
      position: 'absolute',
      alignItems: 'center',
    },
    appName: {
      color: COLORS.black,
      fontSize: 32,
      fontWeight: 'bold',
    },
  });

  export default styles