import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function showMessage() {
    if (sent) {
      return (
        <View>
          <Text style={styles.yourMessage}> {message} </Text>
          <Text style={styles.theirMessage}> Thank you for the gift </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.chatView}>
      <View style={styles.header}>
        <Text style={styles.title}> Chat </Text>
      </View>
      <View style={styles.messages}>{showMessage()}</View>
      <View style={styles.messageSendView}>
        <TextInput
          style={styles.messageInput}
          placeholder={'Message'}
          onChangeText={m => {
            if (!sent) {
              setMessage(m);
            }
          }}
        />
        <Pressable
          style={styles.sendButton}
          onPress={() => {
            if (message !== '') {
              setSent(true);
              showMessage();
            }
          }}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chatView: {flex: 1},
  header: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    padding: 7.5,
  },
  messages: {
    flex: 1,
  },
  yourMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 10,
    paddingVertical: 12.5,
    paddingHorizontal: 20,
    marginRight: 15,
    marginTop: 15,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: 'black',
    borderRadius: 10,
    paddingVertical: 12.5,
    paddingHorizontal: 20,
    marginLeft: 15,
    marginTop: 15,
  },
  messageSendView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  messageInput: {
    borderWidth: 1,
    flex: 0.85,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    margin: 10,
    marginLeft: 10,
    fontSize: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  sendButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 12.5,
    paddingHorizontal: 20,
    flex: 0.15,
    marginRight: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
