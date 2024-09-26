import React, {useState} from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default function Track({navigation}: {navigation: any}) {
  const [mapRegion] = useState({
    latitude: 55.860916,
    longitude: -4.251433,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  return (
    <>
      <View
        style={{
          flex: 0.82,
          width: '85%',
          alignSelf: 'center',
          backgroundColor: 'pink',
          borderRadius: 5,
          padding: 5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            margin: 10,
            marginBottom: 20,
            fontSize: RFPercentage(8),
          }}>
          Tracking Code:
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            margin: 10,
            marginBottom: 20,
            fontSize: RFPercentage(3),
          }}>
          🚚RM-WLFXTZI0P55X🚚
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            margin: 10,
            marginBottom: 20,
            fontSize: RFPercentage(5),
          }}>
          Delivery Details:
        </Text>
        <Text
          style={{
            color: 'black',
            padding: 5,
            fontSize: 20,
            flex: 1,
            textAlign: 'center',
          }}>
          Courier: Royal Mail Service used: Royal Mail Special Delivery
          Guaranteed 1pm™
        </Text>
      </View>
      <View
        style={{
          flex: 0.03,
        }}
      />
      <View
        style={{
          backgroundColor: 'red',
          borderRadius: 10,
          width: '85%',
          padding: 8,
          alignSelf: 'center',
          flex: 0.11,
        }}>
        <Pressable
          onPress={() => {
            const newStatus: string = 'sentAndReceived';
            navigation.navigate('Home', {newStatus: newStatus});
          }}>
          <Text
            style={{
              backgroundColor: 'red',
              color: 'white',
              fontSize: 27,
              borderRadius: 10,
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              fontWeight: 'bold',
            }}>
            Click to confirm receipt
          </Text>
        </Pressable>
      </View>
    </>
  );
}
