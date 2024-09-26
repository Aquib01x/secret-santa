import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  let [marker, setMarker] = useState([]);

  const [position, setPosition] = useState({
    latitude: 53.32036427911401,
    longitude: -2.4552210209037377,
    latitudeDelta: 15,
    longitudeDelta: 15,
  });

  useEffect(() => {
    async function fetchLocation() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: 'GiftApp Permission',
            message: 'GiftApp needs access to your location ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(location => {

            const coordinates = location.coords;
            setPosition({
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            });

            fetch(
              'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
                coordinates.latitude +
                '%2C' +
                coordinates.longitude +
                '&radius=5000&type=post_office&key=AIzaSyCzDAQY9GMvw_hpZCp_lLC8h5AqAspe-qs',
            )
              .then(resp => resp.json())
              .then(data => {
                for (let i = 0; i < data.results.length; i++) {
                  setMarker(data.results);
                }
              })
              .catch(err => console.error(err));
          });
        } else {
          console.log('permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    fetchLocation().then();
  }, []);

  return (
    <MapView
      style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}>
      {marker &&
        marker.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng,
            }}
            title={marker.name}
          />
        ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
