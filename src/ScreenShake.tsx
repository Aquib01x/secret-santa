import React, {useEffect} from 'react';
import RNShake from 'react-native-shake';
import {View, Text, ImageBackground, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default function MyComponent({navigation}: {navigation: any}) {
  const route = useRoute();
  let selectedBudget = [];

  let passonValue = 0;

  if (route.params !== undefined) {
    selectedBudget = Object.values(route.params);
    passonValue = selectedBudget[0];
  }

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setTimeout(() => {
        Alert.alert(
          'Shake Detected!',
          'Click OK to see you gift suggestion!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('RandomFetchPage', {passonValue});
              },
            },
          ],
          {cancelable: false},
        );
      }, 100);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
            fontSize: RFPercentage(4),
          }}>
          Your Selected Budget: £{selectedBudget}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            margin: 10,
            flex: 0.6,
            marginBottom: 20,
            fontSize: RFPercentage(8),
          }}>
          Shake Your Device!
        </Text>
        <ImageBackground
          style={{height: 200, width: 200, flex: 1, alignSelf: 'center'}}
          resizeMode="stretch"
          source={require('../resources/shake.png')}
        />
      </View>
    </>
  );
}
