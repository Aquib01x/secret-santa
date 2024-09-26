import {View, Text, StyleSheet, Button, Alert, Pressable} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

function Cam() {
  const [hasPermission, setHasPermission] = React.useState(false);

  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  function renderCamera() {
    if (device == null) {
      return (
        <View>
          <Text style={{color: '#fff'}}>Loading</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          {hasPermission && (
            <>
              <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                photo={true}
                isActive
              />
            </>
          )}
        </View>
      );
    }
  }
  return (
    <View style={{flex: 1}}>
      {renderCamera()}
      <Pressable
          onPress={() => {
            Alert.alert('Photo submitted. Thanks!');
            let newStatus = 'postSentAndReceived';
            navigation.navigate('Home', {newStatus: newStatus});
          }}>
        <Text style={{
          backgroundColor: 'red',
          color: 'white',
          fontSize: 27,
          borderRadius: 10,
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          fontWeight: 'bold'}}>Click to take photo</Text>
      </Pressable>
    </View>
  );
}

export default Cam;
