import {StyleSheet, Text, View} from 'react-native';

const NetworkCheck = ({status, type}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        Connection Status : {status ? 'Connected' : 'Disconnected'}
      </Text>
      <Text style={styles.statusText}>Connection Type : {type}</Text>
    </View>
  );
};

export default NetworkCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});
