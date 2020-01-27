module.exports = {
  getInfo({ context, payload }) {
    return new Promise(async resolve => {
      await context
        .mutation({ mutation: "calculateBalance", payload })
        .then(response => {
          if (payload === "balance") {
            resolve(response.balance);
          } else if (payload === "statement") {
            resolve(response.statement);
          }
        });
    });
  },
  setBalance({ context, payload }) {
    return new Promise(async resolve => {
      await context
        .mutation({ mutation: "clearBalance", payload })
        .then(_ => context.mutation({ mutation: "updateStatement", payload }))
        .then(response => resolve(response));
    });
  },
  updateStatement({ context, payload }) {
    return new Promise(async resolve => {
      await context
        .mutation({ mutation: "updateStatement", payload })
        .then(response => resolve(response));
    });
  },
  clearBalance({ context, payload }) {
    return new Promise(async resolve => {
      await context
        .mutation({ mutation: "clearBalance", payload })
        .then(response => resolve(response));
    });
  },
  deposit({ context, payload }) {
    if (typeof payload !== "number" || value < 0) {
      throw new Error(`PAYLOAD MUST BE A POSITIVE NUMBER!`);
    }
    return new Promise(async resolve => {
      await context
        .mutation({ mutation: "updateStatement", payload })
        .then(response => resolve(response));
    });
  },
  withdraw({ context, payload }) {
    if (typeof payload !== "number" || payload <= 0) {
      throw new Error(`PAYLOAD MUST BE A POSITIVE NUMBER!`);
    }
    return new Promise(async resolve => {
      await context
        .mutation({ mutation: "updateStatement", payload: -Math.abs(payload) })
        .then(response => resolve(response));
    });
  }
};
