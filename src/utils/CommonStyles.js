import {StyleSheet, Dimensions, Platform} from 'react-native';
import Colors from './Colors';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const behaviorType = {
  padding: 'padding',
  height: 'height',
  position: 'position',
};
const keyboarBehaviour =
  Platform.OS == 'ios' ? behaviorType.padding : behaviorType.padding;

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.darkThemeColor,
  },
  headerContainer: {
    height: 70,
    justifyContent: 'center',
  },
});

export {screenHeight, screenWidth, keyboarBehaviour, behaviorType};
