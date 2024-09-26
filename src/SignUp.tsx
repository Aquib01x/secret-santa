import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import State from './State';

import SplashScreen from 'react-native-splash-screen';

//change back to navigation and use checkLoggedIn to see if user is logged in (don't load sign up)
const SignUp = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    SplashScreen.hide();
  });

  //states
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [interests, setInterests] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [agreeVisibility, setAgreeVisibility] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('Login');

  //dropdown picker data
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Books', value: 'option 1'},
    {label: 'Games', value: 'option 2'},
    {label: 'Arts and Crafts', value: 'option 3'},
    {label: 'Collectibles', value: 'option 4'},
    {label: 'Sports', value: 'option 5'},
  ]);

  function setDisplayedContent() {
    let displayedContent;
    if (currentPage === 'Login') {
      displayedContent = Login();
    } else if (currentPage === 'SignUp') {
      displayedContent = SignUp();
    } else if (currentPage === 'Password') {
      displayedContent = Password();
    } else if (currentPage === 'Successful') {
      displayedContent = Successful();
    }
    return displayedContent;
  }

  function verifyDetailsSignUp() {
    let errorMessage = '';
    if (name === '') {
      errorMessage += ' •Name ';
    }
    if (email === '') {
      errorMessage += ' •Email ';
    }
    if (address === '') {
      errorMessage += ' •Address ';
    }
    if (errorMessage) {
      Alert.alert('The following details must be entered:', errorMessage);
      return false;
    }
    return true;
  }

  function verifyPassword() {
    let errorMessage = '';
    if (password === '') {
      errorMessage = 'Password must be entered';
    } else if (password.length < 6) {
      errorMessage = 'Password must be at least 6 characters';
    } else if (password !== rePassword) {
      errorMessage = 'Passwords do not match';
    }
    if (errorMessage) {
      Alert.alert(errorMessage);
      return false;
    }
    return true;
  }

  function Login() {
    return (
      <View style={styles.loginView}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={v => setLoginName(v)}
          value={loginName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={v => setLoginPassword(v)}
          secureTextEntry={true}
          value={loginPassword}
        />
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            if (State.logIn({name: loginName, password: loginPassword})) {
              navigation.navigate('Home');
            } else {
              Alert.alert(
                'The username or password entered was not recognised. Please try again',
              );
            }
          }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage('SignUp');
          }}>
          <Text style={styles.goToSignUpButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function SignUp() {
    return (
      <View style={styles.signUpView}>
        <Modal
          visible={agreeVisibility}
          animationType="slide"
          transparent={false}>
          <View style={styles.agreement}>
            <Text style={styles.agreementHeader}> Agreement Terms: </Text>
            <Text style={styles.agreementText}>
              {' '}
              By using the Secret Santa app you agree to the following terms:{' '}
            </Text>
            <Text style={styles.agreementText}>
              • The Secret Santa app will match you with another user of the app
              to allow for a gift exchange
            </Text>
            <Text style={styles.agreementText}>
              • Your location will be used to find a drop off point for a gift
              to be sent to, your gift partner will not be given your address,
              only the drop off point's address
            </Text>
            <Text style={styles.agreementText}>
              • The Secret Santa app will store the details you have given
              whilst signing up, to see more about our data storing policy
              please visit our website at
              www.secretsanta.com/how-we-use-your-data
            </Text>
            <Pressable
              style={styles.agreeButton}
              onPress={() => {
                setCurrentPage('Password');
              }}>
              <Text style={styles.agreeButtonText}>I Agree</Text>
            </Pressable>
          </View>
        </Modal>
        <Text style={styles.signUp}>Sign Up</Text>
        <TextInput
          onChangeText={v => setName(v)}
          style={styles.textInput}
          placeholder="Name*"
        />
        <TextInput
          onChangeText={v => setEmail(v)}
          style={styles.textInput}
          placeholder="Email*"
        />
        <TextInput
          onChangeText={v => setAddress(v)}
          style={styles.textInput}
          placeholder="Address*"
        />
        <View style={{zIndex: 1}}>
          <DropDownPicker
            onChangeValue={(v: any) => setInterests(String(v))}
            style={styles.interests}
            textStyle={styles.interestsText}
            dropDownContainerStyle={styles.interestsContainerStyle}
            placeholder="Interests"
            dropDownDirection={'BOTTOM'}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View>
          <Pressable
            style={styles.signUpButton}
            onPress={() => {
              if (verifyDetailsSignUp()) {
                setAgreeVisibility(true);
              }
            }}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={styles.signUpButton}
            onPress={() => {
              setCurrentPage('Login');
            }}>
            <Text style={styles.signUpButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  function Password() {
    return (
      <View style={styles.passwordView}>
        <TextInput
          onChangeText={v => setPassword(v)}
          style={styles.textInput}
          placeholder="Password"
        />
        <TextInput
          onChangeText={v => setRePassword(v)}
          style={styles.textInput}
          placeholder="Re-enter Password"
        />
        <Pressable
          style={styles.createAccountButton}
          onPress={() => {
            if (verifyPassword()) {
              setCurrentPage('Successful');
            }
          }}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </Pressable>
      </View>
    );
  }

  function Successful() {
    State.signUp({name: name, password: password});
    return (
      <View style={styles.successfulView}>
        <ImageBackground
          style={{height: 200, width: 200, alignSelf: 'center'}}
          resizeMode="stretch"
          source={require('../resources/transition.png')}
        />
        <Text style={styles.successMessage}>Account Creation Successful</Text>
        <Pressable
          style={styles.continueButton}
          onPress={() => {
            setAgreeVisibility(false);
            // go to main page
            navigation.navigate('Home');
            // go back to login page so that users who have logged out do not see the successful sign-up page
            setCurrentPage('Login');
          }}>
          <Text style={styles.continueButtonText}>
            Continue to the Secret Santa App
          </Text>
        </Pressable>
      </View>
    );
  }

  return setDisplayedContent();
};

export default SignUp;

const styles = StyleSheet.create({
  appView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  goToSignUpButton: {
    borderRadius: 5,
    width: 140,
    padding: 5,
    marginTop: 20,
    fontSize: 27,
    backgroundColor: 'white',
    color: 'red',
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 140,
    padding: 5,
    marginTop: 20,
    zIndex: 0,
  },
  signUpButtonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },

  signUpView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signUp: {
    fontSize: 30,
    color: 'red',
  },

  textInput: {
    width: 300,
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    fontSize: 22,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },

  agreement: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.01)',
    borderWidth: 2,
    marginTop: 125,
    marginHorizontal: 50,
    paddingVertical: 100,
    top: -80,
  },

  interests: {
    width: 300,
    height: 75,
    borderWidth: 2,
    padding: 20,
    margin: 10,
    marginBottom: 30,
    marginLeft: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },

  interestsContainerStyle: {
    justifyContent: 'flex-start',
    width: 300,
    marginLeft: 10,
  },

  interestsText: {
    fontSize: 22,
  },

  passwordView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successfulView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successMessage: {
    fontSize: 22,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 140,
    padding: 5,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  agreeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 140,
    padding: 5,
    marginTop: 20,
    height: 45,
  },
  agreeButtonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  agreementText: {
    fontSize: 15,
    margin: 10,
  },
  agreementHeader: {
    fontSize: 30,
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 200,
    height: 50,
    padding: 5,
    marginTop: 20,
  },
  createAccountButtonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 300,
    height: 40,
    padding: 5,
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
});
