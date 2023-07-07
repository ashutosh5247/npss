import * as React from 'react';
import {View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import TextHandler from './TextHandler';
import Button from './CustomButton';

const OfflineNotice = ({visibleNetNotice, hideNetModal}) => {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 100,
    flex: 0.4,
    marginHorizontal: 20,
    borderRadius: 10,
  };

  return (
    <Portal>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={visibleNetNotice}
        onDismiss={hideNetModal}
        contentContainerStyle={containerStyle}>
        <View style={{flex: 1, backgroundColor:"red"}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TextHandler
              style={{fontWeight: '700', fontSize: 18, textAlign: 'center'}}>
              No Internet ⚠️
            </TextHandler>
            <TextHandler
              style={{fontWeight: '500', fontSize: 15, textAlign: 'center'}}>
              Seems like you're not connected to the Internet. Please connect
              and restart the application
            </TextHandler>
            <Button
              title={'OK'}
              onPress={() => {
                hideNetModal();
              }}
              ButtonContainerStyle={{
                marginVertical: 20,
              }}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default OfflineNotice;
