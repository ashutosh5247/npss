import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const CarouselView = ({
  horizontal,
  dataSource,
  pagingEnabled,
  listStyle,
  listItemContainerStyle,
  onPressItem,
  onScrollEnd,
  renderItem,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        style={[listStyle]}
        horizontal={horizontal}
        pagingEnabled={pagingEnabled}
        renderItem={({item, index}) => {
          return renderItem(item, index);
        }}
        onScrollEndDrag={() => {
          onScrollEnd();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

CarouselView.propTypes = {
  horizontal: PropTypes.bool,
  dataSource: PropTypes.array,
  pagingEnabled: PropTypes.bool,
  listStyle: PropTypes.shape({
    flex: PropTypes.number,
  }),
  listItemContainerStyle: PropTypes.shape({
    flex: PropTypes.number,
  }),
  onPressItem: PropTypes.func,
  onScrollEnd: PropTypes.func,
  renderItem: PropTypes.func,
};

CarouselView.defaultProps = {
  dataSource: [],
  horizontal: false,
  pagingEnabled: false,
  onPressItem: () => {},
  onScrollEnd: () => {},
};

export default CarouselView;
