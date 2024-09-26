import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text, Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from "react-native-responsive-fontsize";

export default function App() {
  const nav = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '£0-£20', value: 20},
    {label: '£0-£50', value: 50},
    {label: '£0-£100', value: 100},
    {label: '£100+', value: '100+'},
  ]);

  return (
    <>
      <View
          style={{
              flex: 0.82,
              width:'85%',
              alignSelf:'center',
              backgroundColor: 'pink',
              borderRadius: 5,
              padding: 5,
          }}>
        <Text style={{textAlign: 'center',
            color: 'black',
            margin: 10,
            flex:0.4,
            marginBottom: 20,
            fontSize: RFPercentage(8)}}>
          Select your budget:💰
        </Text>
        <DropDownPicker
          placeholder="Ranges"
          style={{flex:0.3}}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
     <View
        style={{
            flex: 0.03,
        }}>
    </View><View
        style={{
            backgroundColor: 'red',
            borderRadius: 10,
            width:'85%',
            padding:8,
            alignSelf: 'center',
            flex: 0.11,
        }}>

        <Pressable

            onPress={() => {
                if (value === null) {
                    Alert.alert('You have to select a budget to continue.');
                } else {
                    nav.navigate('ShakePage', {item: value});
                }
            }}>
            <Text style={{
                backgroundColor: 'red',
                color: 'white',
                fontSize: 27,
                borderRadius: 10,
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                fontWeight: 'bold'}}>Click to proceed</Text>
        </Pressable>
    </View>

    </>
  );
}
