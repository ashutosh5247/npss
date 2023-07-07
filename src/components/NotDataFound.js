import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

import Fonts from '../Res/Utils/Fonts';
import Colors from '../Res/Utils/Colors';

const NoDataFound = ({text, textStyle}) => {
  return (
    <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
      <Text
        style={[{fontFamily: Fonts.GothicRegular, fontSize: 14}, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

NoDataFound.propTypes = {
  text: PropTypes.string,
  textStyle: PropTypes.shape({
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

NoDataFound.defaultProps = {
  textStyle: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: Fonts.GothicRegular,
  },
  text: '',
};

export default NoDataFound;
