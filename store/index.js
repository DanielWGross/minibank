const actions = require("./actions");
const mutations = require("./mutations");
const state = require("./state");
const Store = require("./store");

module.exports = new Store({
  actions,
  mutations,
  state
});
