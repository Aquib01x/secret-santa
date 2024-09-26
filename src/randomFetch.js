import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Pressable,
} from 'react-native';
import {Linking} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default function App() {
  const route = useRoute();
  let Budget = [];

  if (route.params !== undefined) {
    Budget = Object.values(route.params);
  }
    let fetchedData = undefined;
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState();
  let [response, setResponse] = useState();

  //useEffect(() => {
    if (Budget[0] === 20) {
        /*
      fetch(
        'https://api.rainforestapi.com/request?api_key=B794A73BC95045DBACDF92AE886C1AD6&type=search&amazon_domain=amazon.co.uk&search_term=gifts+under+%C2%A320&output=json',
      )
        .then(resp => resp.json())
        .then(json => setResponse(json))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));

         */

        fetchedData = require('../resources/under-twenty.json');

    } else if (Budget[0] === 50) {
        /*
      fetch(
        'https://api.rainforestapi.com/request?api_key=B794A73BC95045DBACDF92AE886C1AD6&type=search&amazon_domain=amazon.co.uk&search_term=gifts+under+%C2%A350&output=json',
      )
        .then(resp => resp.json())
        .then(json => setResponse(json))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
         */

        fetchedData = require('../resources/under-fifty.json');

    } else if (Budget[0] === 100) {
     /*
      fetch(
        'https://api.rainforestapi.com/request?api_key=B794A73BC95045DBACDF92AE886C1AD6&type=search&amazon_domain=amazon.co.uk&search_term=gifts+under+%C2%A3100&output=json',
      )
        .then(resp => resp.json())
        .then(json => setResponse(json))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
        */

        fetchedData = require('../resources/under-onehundred.json');

    } else {
        /*
         fetch(
           'https://api.rainforestapi.com/request?api_key=B794A73BC95045DBACDF92AE886C1AD6&type=search&amazon_domain=amazon.co.uk&search_term=gifts+over+%C2%A3100&output=json',
         )
           .then(resp => resp.json())
           .then(json => setResponse(json))
           .catch(error => console.error(error))
           .finally(() => setIsLoading(false));
       }
         */
        fetchedData = require('../resources/over-onehundred.json');
    }

 //}, []);

  const getContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={{width: '100%', height: '100%', alignSelf: 'center'}}
        />
      );
    }
    if (error) {
      return <Text>Error</Text>;
    }

    let randomItemGenerator = Math.round(
      Math.random() * fetchedData.search_results.length,
    );

    return (
      <>
        <View
          style={{
            flex: 1.5,
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
              padding: 10,
              fontSize: RFPercentage(6),
            }}>
            Your gift suggestion:🎁
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              margin: 10,
              padding: 0,
              marginBottom: 20,
              fontSize: RFPercentage(2),
            }}>
            {fetchedData.search_results[randomItemGenerator].title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              flex: 0.3,

              fontSize: RFPercentage(4),
            }}>
            Price:£{fetchedData.search_results[randomItemGenerator].price.value}
          </Text>
          <ImageBackground
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              flex: 1,
              backgroundColor: 'pink',
            }}
            resizeMode="stretch"
            source={{
              uri: fetchedData.search_results[randomItemGenerator].image,
            }}
          />
        </View>
        <View style={{flex: 0.05}} />
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
              Linking.openURL(
                fetchedData.search_results[randomItemGenerator].link,
              );
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
              Click to purchase
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <View style={{flex: 0.95}}>
      {getContent()}
      <StatusBar style="auto" />
    </View>
  );
}
