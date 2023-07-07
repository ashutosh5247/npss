import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Colors from '../Res/Utils/Colors';
import CommonStyles from '../Res/Utils/CommonStyles';
import PropTypes from 'prop-types';
import Images from '../Res/Assets/Images/Index';

const NavigationHeader = ({
  children,
  backButtonEnabled,
  titleEnabled,
  title,
  subtitle,
  style,
  titleStyle,
  subTitleStyle,
  onPressBack,
  leftContainerStyle,
}) => {
  return (
    <View style={[CommonStyles.headerContainer, style]}>
      <View
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 15,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            left: -20,
            top: 0,
            bottom: 0,
            right: 0,
          }}>
          <Image
            style={{flex: 1}}
            source={Images.headerBG}
            resizeMode={'contain'}
          />
        </View>
        <View style={[{flex: 1}, leftContainerStyle]}>
          {(titleEnabled || title != '') && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[titleStyle]}>{title}</Text>
              <Text style={[subTitleStyle]}>{subtitle}</Text>
            </View>
          )}
          {backButtonEnabled && (
            <TouchableOpacity
              onPress={onPressBack}
              style={{
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 25, width: 25}}
                source={Images.backIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          )}
        </View>
        {children}
      </View>
    </View>
  );
};

NavigationHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPressBack: PropTypes.func,
  bgImage: PropTypes.number,
  titleEnabled: PropTypes.bool,
  backButtonEnabled: PropTypes.bool,
  children: PropTypes.element,
  leftContainerStyle: PropTypes.shape({
    flexDirection: PropTypes.string,
    alignItems: PropTypes.string,
  }),
  style: PropTypes.shape({
    flex: PropTypes.number,
    flexDirection: PropTypes.oneOf([
      'row',
      'column',
      'row-reverse',
      'column-reverse',
    ]),
    justifyContent: PropTypes.oneOf([
      'center',
      'flex-end',
      'flex-start',
      'space-around',
      'space-between',
      'space-evenly',
    ]),
    alignItems: PropTypes.oneOf([
      'baseline',
      'center',
      'flex-end',
      'flex-start',
      'stretch',
    ]),
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
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
  }),
  titleStyle: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    fontWeight: PropTypes.oneOf([
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'bold',
    ]),
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
  }),
  subTitleStyle: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    fontWeight: PropTypes.oneOf([
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'bold',
    ]),
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
  }),
};

NavigationHeader.defaultProps = {
  titleStyle: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '500',
  },
  subTitleStyle: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '300',
    marginTop: 5,
  },
  title: '',
  subtitle: '',
  titleEnabled: false,
  backButtonEnabled: false,
  style: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  bgImage: null,
  leftContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default NavigationHeader;
