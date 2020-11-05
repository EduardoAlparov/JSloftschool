class Store {
  constructor(state) {
    this.state = state;
  }

  setState(name, data) {
    this.state[name] = data;
  }

  getState(name) {
    return this.state[name];
  }
}

export default Store;
