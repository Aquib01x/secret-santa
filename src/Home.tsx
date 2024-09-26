import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Dialog from 'react-native-dialog';
import {LogBox} from 'react-native';
import State from './State';
import ChatScreen from './Chat';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

// The Home screen Page
function HomeScreen({navigation, route}: {navigation: any; route: any}) {
  navigation = route.params.navigation;
  let status = State.getStatus();
  return (
    <View style={styles.page}>
      {Status({status, navigation})}
      {MessageBox({status, navigation})}
    </View>
  );
}

// Message to be shown on the status
// The user has not yet sent their gift
function MustSendMessage({navigation}: {navigation: any}) {
  return (
    <View>
      <Text style={styles.messageHeader}>Welcome!</Text>
      <Text style={styles.messageBody}>
        Everything is all set up for you to send a gift to a lucky recipient
      </Text>
      <Text style={styles.messageBody}>
        Once you have decided on your gift, all you need to do is post it to
        this address
      </Text>
      <Text style={styles.messageBodyBigger}>
        Strathclyde, Glasgow, Scotland
      </Text>
      <Button
        color={'red'}
        title={'Drop off points near me'}
        onPress={() => {
          navigation.navigate('DropPage');
        }}
      />
      <Text style={styles.messageBody}>
        Once you have sent the gift please let us know! We'll let both you and
        the recipient know when the gift has been delivered.
      </Text>
      <Text style={styles.messageBody}>
        🔽If you need some inspiration click the button below🔽
      </Text>
      <Button
        color={'red'}
        onPress={() => {
          navigation.navigate('BudgetPage');
        }}
        title={'inspire me!'}
      />
    </View>
  );
}
// Message to be shown on the status
// A gift has been sent and the user is waiting to receive a gift
function SentWaitingToReceiveMessage() {
  return (
    <View>
      <Text style={styles.messageHeader}>Well done!</Text>
      <Text style={styles.messageBodyBigger}>You have sent a gift🎁</Text>
      <Text style={styles.messageBodyBigger}>
        all you need to do is wait for your match to send you their gift
      </Text>
      <Text style={styles.messageBodyBigger}>
        We'll let you know when it has been sent.
      </Text>
    </View>
  );
}

// Message to be shown on the status
// The user has both sent a received a gift
function SentAndReceivedMessage() {
  return (
    <View>
      <Text style={styles.messageHeader}>Hooray!</Text>
      <Text style={styles.messageBody}>
        Your gift has been picked up from the delivery point.
      </Text>
      <Text style={styles.messageBody}>
        If you want you can take a photo of the gift so we can show your gift
        partner that their gift arrived safely. We hope you enjoy your new gift.
      </Text>
      <Text style={styles.messageBody}>
        ✨If you really liked your gift and want the sender to know, you can
        leave a review here✨
      </Text>
      <Rating tintColor="pink" style={styles.review} type="custom" />
      <Button
        color={'red'}
        onPress={() => {
          Alert.alert('Thanks for submitting your review');
        }}
        title={'submit your review'}
      />
    </View>
  );
}

// Message to be shown on the status
// The user has both sent a received a gift
function PostSentAndReceivedMessage() {
  return (
    <View>
      <Text style={styles.messageHeader}>All Done</Text>
      <Text style={styles.messageBodyBigger}>
        You have sent a gift, and received a gift...
      </Text>
      <Text style={styles.messageBodyBigger}>
        If you would like to do it all again, just press the button at the
        bottom of your screen and we'll get it sorted.
      </Text>
      <Text style={styles.messageBodyBigger}>
        Thanks for using Secret Santa
      </Text>
    </View>
  );
}

// The status box on the home page
function Status({status, navigation}: {status: any; navigation: any}) {
  if (status === 'mustSend') {
    return (
      <View style={styles.statusBox}>{MustSendMessage({navigation})}</View>
    );
  }
  if (status === 'sent') {
    return (
      <View style={styles.statusBox}>
        <SentWaitingToReceiveMessage />
      </View>
    );
  }
  if (status === 'sentAndReceived') {
    return (
      <View style={styles.statusBox}>
        <SentAndReceivedMessage />
      </View>
    );
  }
  if (status === 'postSentAndReceived') {
    return (
      <View style={styles.statusBox}>
        <PostSentAndReceivedMessage />
      </View>
    );
  }
}

// the message box on the home page
function MessageBox({status, navigation}: {status: any; navigation: any}) {
  if (status === 'mustSend') {
    return (
      <View style={styles.messageBox}>
        <Pressable
          style={styles.statusButton}
          onPress={() => {
            Alert.alert(
              'Thanks for letting us know\nOur systems will check\nthe gift has been sent.',
            );
            const newStatus: string = 'sent';
            State.setStatus({newStatus});
            navigation.navigate('LogIn');
            navigation.navigate('Home');
          }}>
          <Text style={styles.statusButton}>I have sent my gift</Text>
        </Pressable>
      </View>
    );
  }
  if (status === 'sent') {
    return (
      <View style={styles.messageBox}>
        <Pressable
          style={styles.statusButton}
          onPress={() => {
            navigation.navigate('TrackPage');
          }}>
          <Text style={styles.statusButton}>Click to track package</Text>
        </Pressable>
      </View>
    );
  }
  if (status === 'sentAndReceived') {
    return (
      <View style={styles.messageBox}>
        <Pressable
          style={styles.statusButton}
          onPress={() => {
            navigation.navigate('CameraPage');
          }}>
          <Text style={styles.statusButton}>
            Click to take a photo of your gift
          </Text>
        </Pressable>
      </View>
    );
  }
  if (status === 'postSentAndReceived') {
    return (
      <View style={styles.messageBox}>
        <Pressable
          style={styles.statusButton}
          onPress={() => {
            // set state to start new gift process
            let newStatus: string = 'mustSend';
            State.setStatus({newStatus});
            navigation.navigate('LogIn');
            navigation.navigate('Home');
          }}>
          <Text style={styles.statusButton}>Start again</Text>
        </Pressable>
      </View>
    );
  }
}

// The Account screen Page
function AccountScreen({navigation, route}: {navigation: any; route: any}) {
  navigation = route.params.navigation;
  const accountName = State.getAccountName();
  const [visible, setVisible] = useState(false);
  const [dialogueTitle, setDialogueTitle] = useState('');
  const [dialogueDescription, setDialogueDescription] = useState('');
  const [dialogueField, setDialogueField] = useState('');
  const [dialogueInput, setDialogueInput] = useState('');
  const showDialogue = ({
    title,
    description,
    field,
  }: {
    title: string;
    description: string;
    field: string;
  }) => {
    setDialogueTitle(title);
    setDialogueDescription(description);
    setDialogueField(field);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = () => {
    if (dialogueInput.length === 0) {
      Alert.alert(dialogueField + ' cannot be empty');
      return;
    }
    if (dialogueField === 'User name') {
      State.setAccountName({newAccountName: dialogueInput});
    }
    if (dialogueField === 'Password') {
      if (dialogueInput.length < 6) {
        Alert.alert('Password must be at least 6 characters');
        return;
      }
      State.setPassword({newPassword: dialogueInput});
    }
    setVisible(false);
    Alert.alert(dialogueField + ' has been successfully updated');
  };

  return (
    <View style={styles.page}>
      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title>{dialogueTitle}</Dialog.Title>
        <Dialog.Description>{dialogueDescription}</Dialog.Description>
        <Dialog.Input onChangeText={s => setDialogueInput(s)} />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Change" onPress={handleChange} />
      </Dialog.Container>

      <Image
        style={styles.accountImage}
        source={require('../resources/person-circle-outline.png')}
      />
      <Text style={styles.accountName}>{accountName}</Text>
      <Button
        onPress={() => {
          showDialogue({
            title: 'Username',
            description: 'Please enter a new username',
            field: 'User name',
          });
        }}
        color={'red'}
        title={'Change Username'}
      />
      <Button
        onPress={() => {
          showDialogue({
            title: 'Email Address',
            description: 'Please enter a new email address',
            field: 'Email',
          });
        }}
        color={'red'}
        title={'Change Email Address'}
      />
      <Button
        onPress={() => {
          showDialogue({
            title: 'Address',
            description: 'Please enter a new address',
            field: 'Address',
          });
        }}
        color={'red'}
        title={'Change Address'}
      />
      <Button
        onPress={() => {
          showDialogue({
            title: 'Password',
            description: 'Please enter a new password',
            field: 'Password',
          });
        }}
        color={'red'}
        title={'Change Password'}
      />
      <Button
        color={'red'}
        onPress={() => {
          navigation.navigate('LogIn');
        }}
        title={'Sign Out'}
      />
      <Button
        onPress={() => {
          State.removeUser();
          Alert.alert(
            'Account successfully deleted, we hope to see you sometime soon ☺️',
          );
          navigation.navigate('LogIn');
        }}
        color={'red'}
        title={'Delete Account'}
      />
    </View>
  );
}

// The main window of the app, contains navigation, initially shows the Home Page

const Home = ({route, navigation}: {route: any; navigation: any}) => {
  // update the state
  if (route.params !== undefined) {
    if (route.params.newStatus !== undefined) {
      let newStatus: string = route.params.newStatus;
      State.setStatus({newStatus});
      if (newStatus !== 'sendAndReceived') {
        navigation.navigate('LogIn');
        navigation.navigate('Home');
      }
    }
  }

  return (
    <NavigationContainer independent={true}>
      <NavigationBar.Navigator
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string = '';
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbox' : 'chatbox-outline';
              } else if (route.name === 'Account') {
                iconName = focused ? 'person' : 'person-outline';
              } else {
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'gray',
          };
        }}>
        <NavigationBar.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
          initialParams={{navigation: navigation}}
        />
        <NavigationBar.Screen
          options={{headerShown: false}}
          name="Chat"
          component={ChatScreen}
        />
        <NavigationBar.Screen
          options={{headerShown: false}}
          name="Account"
          component={AccountScreen}
          initialParams={{navigation: navigation}}
        />
      </NavigationBar.Navigator>
    </NavigationContainer>
  );
};

export default Home;

const NavigationBar = createBottomTabNavigator();

// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  statusBox: {
    flex: 0.82,
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 10,
  },
  messageBox: {
    flex: 0.13,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  statusButton: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 25,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  accountName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  accountImage: {
    flex: 0.5,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  review: {
    marginBottom: 10,
  },
  messageHeader: {
    textAlign: 'center',
    color: 'black',
    margin: 10,
    marginBottom: 20,
    fontSize: RFPercentage(6),
  },
  messageBody: {
    textAlign: 'center',
    color: 'black',
    margin: 10,
    marginBottom: 10,
    fontSize: RFPercentage(2),
  },
  messageBodyBigger: {
    textAlign: 'center',
    color: 'black',
    margin: 10,
    marginBottom: 10,
    fontSize: RFPercentage(2.5),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
