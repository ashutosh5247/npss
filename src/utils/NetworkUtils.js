import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import RNRestart from 'react-native-restart';
import Images from '../Assets/Images/Index';

import Colors from './Colors';

const NetworkUtils = ({onClose}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
        marginBottom: 15,
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          height: 30,
          width: 30,
        }}
        activeOpacity={0.5}
        onPress={onClose}>
        <Image style={{height: 20, width: 20}} source={Images.crossIcon} />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: '600',
          color: Colors.black,
          fontSize: 15,
        }}>
        {'No Internet Connection!'}
      </Text>
      <Text
        style={{
          fontWeight: '400',
          color: Colors.darkGrey,
          textAlign: 'center',
          fontSize: 12,
          marginTop: 5,
          marginHorizontal: 10,
        }}>
        {
          'Please reload app now. If issue persists, then try again later once internet connection is stable'
        }
      </Text>
      <TouchableOpacity
        style={{
          borderRadius: 5,
          paddingHorizontal: 15,
          backgroundColor: Colors.themeColor,
          marginVertical: 15,
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={0.5}
        onPress={() => {
          console.log('hello');
          RNRestart.restart();
        }}>
        <Text
          style={{
            color: Colors.white,
          }}>
          {'Reload'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NetworkUtils;
