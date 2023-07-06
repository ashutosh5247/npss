import {View, Text, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextHandler} from '../../components/index';
import styles from './style';
import {Checkbox, TextInput} from 'react-native-paper';
import {COMPONENT} from '../../utils/dyanmicComponentRenderer';

export default function LoginScreen() {
  let temp = [
    {
      fieldName: 'First Name',
      type: 'inputBox',
      keyboardType: 'default',
      maxLength: '20',
      data: null,
      id: 'txt-1',
    },
    {
      fieldName: 'Gender',
      type: 'checkbox',
      multiSelect: false,
      id: 'chk-1',

      data: [
        {
          id: '1',
          text: 'Male',
          value: true,
        },
        {
          id: '2',
          text: 'Female',
          value: false,
        },
      ],
    },
    {
      fieldName: 'Description',
      type: 'textArea',
      keyboardType: 'default',
      maxLength: '20',
      data: null,
      id: 'txtar-1',
    },
  ];

  useEffect(() => {
    console.log(activeControl);
  }, [activeControl]);

  const [formcontrols, setFormControls] = useState(temp);
  const [activeControl, setActiveControl] = useState({key: null, index: 0});

  function compoentRenderer(item, index) {
    switch (item.type) {
      case COMPONENT.INPUT:
        return (
          <TextInput
            onFocus={() => {
              setActiveControl({key: item.id, index: index});
              Alert.alert('hi', JSON.stringify(activeControl));
            }}
            onKeyPress={e => {
              if (item.id === activeControl) {
                // setFormControls({...temp, temp[activeControl.index][data] : E })
              }
            }}
            value={item.data}
            label={item.fieldName}
            placeholder={item.fieldName}
          />
        );
      case COMPONENT.CHECKBOX:
        return (
          <FlatList
            data={item.data}
            horizontal
            renderItem={({item, index}) => {
              return (
                <>
                  <Checkbox
                    status={item.value ? 'checked' : 'unchecked'}
                    onPress={() => {
                      // setChecked(!checked);
                    }}
                  />
                  <TextHandler>{item.text}</TextHandler>
                </>
              );
            }}
          />
        );
      case COMPONENT.TEXTAREA:
        return (
          <TextInput
            style={{height: 100}}
            onKeyPress={E => setFormControls({...temp})}
            value={item.data}
            label={item.fieldName}
            placeholder={item.fieldName}
            onFocus={() => {
              setActiveControl({key: item.id, index: index});
              Alert.alert('hi2', JSON.stringify(activeControl));
            }}
          />
        );

      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <TextHandler>LoginScreen</TextHandler>
      <FlatList
        style={{flex: 1}}
        data={temp}
        renderItem={({item, index}) => {
          return compoentRenderer(item, index);
        }}
      />
    </View>
  );
}
