import React from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import Colors from '../Res/Utils/Colors';
import PropTypes from 'prop-types';
import Fonts from './Fonts';
// import {TextInput} from 'react-native-paper';
const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  children,
  error,
  isRequired,
  isSecured,
  keyboardType,
  maxLength,
  style,
  inputStyle,
  leftComponent,
  rightComponent,
  multiline,
  numberOfLines,
  editable,
  showOnTop,
}) => {
  return (
    <View style={[{flex: 1}, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginVertical: 2.5,
          paddingHorizontal: 15,
          flex: 1,
        }}>
        {leftComponent}
        <TextInput
          style={[
            {
              height: numberOfLines == 1 ? 45 : numberOfLines * 33,
              flex: 1,
              fontSize: 16,
              fontFamily: Fonts,
              color: Colors.textInputBorder,
              borderWidth: 1,
              borderColor: Colors.themeColor,
              borderRadius: 16,
              borderTopStartRadius: leftComponent ? 0 : 16,
              borderBottomLeftRadius: leftComponent ? 0 : 16,
              borderTopEndRadius: rightComponent ? 0 : 16,
              borderBottomRightRadius: rightComponent ? 0 : 16,
              borderLeftWidth: leftComponent ? 0 : 1,
              borderRightWidth: rightComponent ? 0 : 1,
              paddingLeft: 20,
              paddingRight: 10,
              marginLeft: leftComponent ? -10 : 0,
              marginRight: rightComponent ? -10 : 0,
              fontWeight: '500',
            },
            inputStyle,
          ]}
          placeholderTextColor={Colors.themeColor}
          autoCapitalize={'none'}
          editable={editable}
          value={value}
          secureTextEntry={isSecured}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          minHeight={40}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {rightComponent}
      </View>
      {children}
    </View>
  );
};

CustomTextInput.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onChangeText: PropTypes.func,
  children: PropTypes.element,
  isRequired: PropTypes.bool,
  isSecured: PropTypes.bool,
  keyboardType: PropTypes.oneOf([
    'ascii-capable',
    'decimal-pad',
    'default',
    'email-address',
    'name-phone-pad',
    'numbers-and-punctuation',
    'number-pad',
    'numeric',
    'phone-pad',
    'twitter',
    'web-search',
    'url',
    'visible-password',
  ]),
  maxLength: PropTypes.number,
  leftComponent: PropTypes.element,
  rightComponent: PropTypes.element,
  style: PropTypes.shape({
    flex: PropTypes.number,
    marginHorizontal: PropTypes.number,
    marginVertical: PropTypes.number,
    marginStart: PropTypes.number,
    marginEnd: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    margin: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    paddingVertical: PropTypes.number,
    paddingStart: PropTypes.number,
    paddingEnd: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    padding: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    minHeight: PropTypes.number,
  }),
  inputStyle: PropTypes.shape({
    flex: PropTypes.number,
    marginHorizontal: PropTypes.number,
    marginVertical: PropTypes.number,
    marginStart: PropTypes.number,
    marginEnd: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    margin: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    paddingVertical: PropTypes.number,
    paddingStart: PropTypes.number,
    paddingEnd: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    padding: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    minHeight: PropTypes.number,
  }),
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  editable: PropTypes.bool,
  showOnTop: PropTypes.bool,
};

CustomTextInput.defaultProps = {
  placeholder: 'Enter text here',
  isRequired: false,
  isSecured: false,
  keyboardType: 'default',
  multiline: false,
  editable: true,
  style: {
    marginTop: 10,
  },
  numberOfLines: 1,
  showOnTop: true,
};

export default CustomTextInput;
