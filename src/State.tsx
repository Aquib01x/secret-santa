class State {
  /**
   * initially all users start at mustSend
   * states = {mustSend, sent, sentAndReceived, postSentAndReceived}
   */
  users = [
    {
      name: 'TestUser',
      password: 'password',
      status: 'mustSend',
    },
    {
      name: 'Joe',
      password: 'joepass',
      status: 'mustSend',
    },
    {
      name: 'Callan',
      password: 'callanpass',
      status: 'mustSend',
    },
    {
      name: 'Aquib',
      password: 'aquibpass',
      status: 'mustSend',
    },
    {
      name: 'Gwen',
      password: 'gwenpass',
      status: 'mustSend',
    },
  ];

  currentUser = {name: '', password: '', status: 'mustSend'};

  logIn({name, password}: {name: string; password: string}) {
    for (let key in this.users) {
      if (
        this.users[key].name === name &&
        this.users[key].password === password
      ) {
        this.currentUser = this.users[key];
        return true;
      }
    }
    return false;
  }

  signUp({name, password}: {name: string; password: string}) {
    let newUser = {name: name, password: password, status: 'mustSend'};
    this.currentUser = newUser;
    this.users.push(newUser);
  }

  getStatus() {
    return this.currentUser.status;
  }

  setStatus({newStatus}: {newStatus: string}) {
    this.currentUser.status = newStatus;
  }

  getAccountName() {
    return this.currentUser.name;
  }

  setAccountName({newAccountName}: {newAccountName: string}) {
    for (let key in this.users) {
      if (this.users[key] === this.currentUser) {
        this.users[key].name = newAccountName;
        this.currentUser.name = newAccountName;
      }
    }
  }

  setPassword({newPassword}: {newPassword: string}) {
    for (let key in this.users) {
      if (this.users[key] === this.currentUser) {
        this.users[key].password = newPassword;
        this.currentUser.password = newPassword;
      }
    }
  }

  removeUser() {
    for (let key in this.users) {
      if (this.users[key] === this.currentUser) {
        this.users[key].name = '';
        this.users[key].password = '';
        this.currentUser = {name: '', password: '', status: ''};
      }
    }
  }
}

const state = new State();
export default state;
