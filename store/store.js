function Store({ actions, mutations, state }) {
  this.actions = actions || {};
  this.mutations = mutations || {};
  this.state = state || {};

  this.dispatch = function({ action: actionType, payload = {} }) {
    return new Promise(async (resolve, reject) => {
      if (typeof this.actions[actionType] !== "function") {
        console.error(`Action "${actionType} doesn't exist.`);
        reject(false);
      }

      console.log(`ACTION: ${actionType}`);
      let result = await this.actions[actionType]({ context: this, payload });
      resolve(result);
    });
  };

  this.mutation = function({ mutation: mutationType, payload = {} }) {
    return new Promise(async (resolve, reject) => {
      if (typeof this.mutations[mutationType] !== "function") {
        console.error(`Mutation "${mutationType} doesn't exist.`);
        reject(false);
      }

      let newState = await this.mutations[mutationType]({
        state: this.state,
        payload: payload
      });
      this.state = Object.assign(this.state, newState);
      resolve(this.state);
    });
  };
}

module.exports = Store;
