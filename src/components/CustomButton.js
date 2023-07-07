import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {TextHandler} from './index';
import {colors} from '../utils';

function Button({ButtonContainerStyle, onPress, icon, textstyle, title}) {
  return (
    <TouchableOpacity
      style={[Styles.ButtonContainer, ButtonContainerStyle || {}]}
      onPress={() => (onPress ? onPress() : {})}>
      {icon && icon}
      <TextHandler style={[Styles.localtextstyle, textstyle || {}]}>
        {title}
      </TextHandler>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: colors.red,
    // alignSelf: 'baseline',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    padding: 16,
    borderRadius: 3,
    shadowRadius: 10,
  },
  localtextstyle: {
    // marginHorizontal: 60,
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
  inner: {},
});

export default Button;
