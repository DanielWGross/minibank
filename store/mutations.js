module.exports = {
  clearBalance({ state }) {
    return new Promise(resolve => {
      state.balance = 0;
      state.statement = [];
      resolve(state);
    });
  },
  updateStatement({ state, payload }) {
    return new Promise(async resolve => {
      await state.statement.push({
        action: "UPDATE STATEMENT",
        payload,
        date: Date.now()
      });
      resolve(state);
    });
  },
  calculateBalance({ state }) {
    return new Promise(async resolve => {
      state.balance = await state.statement.reduce(
        (acc, cur) => parseInt(acc) + parseInt(cur.payload),
        0
      );
      resolve(state);
    });
  }
};
