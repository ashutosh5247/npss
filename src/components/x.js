import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import { useStore } from 'react-redux';

export default function NewComp() {
  const store1 = useStore();

  useEffect(() => {
    console.log(store1);
  }, []);
  return (
    <View>
      <Text>NewComp</Text>
    </View>
  );
}
