import {
  View,
  Text,
  FlatList,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OfflineNotice, TextHandler} from '../../components/index';
import styles from './style';
import {Checkbox, TextInput} from 'react-native-paper';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {COMPONENT} from '../../utils/dyanmicComponentRenderer';
import NetworkCheck from '../../components/NetworkCheck';
import fetchAPIData from '../../networking/api.network';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';

export default function LoginScreen() {
  const [offlineModalVisble, setofflineModalVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [connectionType, setConnectionType] = React.useState(null);
  const [apiCall, setApiCall] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector(state => state.payloadReducer);

  const handleNetworkChange = async state => {
    setConnectionStatus(state.isConnected);
    setConnectionType(state.type);
    if (state.isConnected && !apiCall) {
      // console.log('state->', state);
      setApiCall(true);
      const data = await fetchAPIData();
      console.log('data->', data);
      if (!store?.data) {
        dispatch({
          type: ACTION_CONSTANTS.DATA_FETCHED_SUCCESSFUL,
          payload: data,
        });
      }
    }
  };

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
    console.log('store-.', store);
  }, []);

  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);
    return () => {
      netInfoSubscription && netInfoSubscription();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setofflineModalVisible(true);
      } else {
        setofflineModalVisible(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

      {connectionStatus ? (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <TextHandler>
              {'Connection Status : ' + connectionStatus
                ? 'Connected'
                : 'Disconnected'}
            </TextHandler>
            <TextHandler>
              {'You are connected by ' + connectionType}
            </TextHandler>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <NetworkCheck status={connectionStatus} type={connectionType} />
        </View>
      )}
      <FlatList
        style={{flex: 1}}
        data={temp}
        renderItem={({item, index}) => {
          return compoentRenderer(item, index);
        }}
      />
      <TextHandler>{store?.data?.title || ''}</TextHandler>
    </View>
  );
}
