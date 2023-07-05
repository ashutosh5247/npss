import React from 'react';
import {View, Text} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import Colors from '../Res/Utils/Colors';

export const Loader = () => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.6)',
        },
      ]}>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: Colors.transparent,
          position: 'absolute',
        }}>
        <MaterialIndicator
          color={Colors.themeColor}
          size={40}
          // count={4}
          animationDuration={3000}
        />
      </View>
      {/* <Text
        style={{
          position: "absolute",
          color: Colors.weirdGreen,
          fontSize: 9,
          fontFamily: Fonts.MontserratSemiBold,
        }}
      > */}
      {/* {I18n.t("common.loading")}
      </Text> */}
    </View>
  );
};
