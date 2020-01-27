const store = require("./store/index");

const main = async function() {
  await store.dispatch({ action: "setBalance", payload: 100 });
  await store.dispatch({ action: "updateStatement", payload: 200 });
  await store.dispatch({ action: "withdraw", payload: 300 });
  const balance = await store.dispatch({
    action: "getInfo",
    payload: "balance"
  });
  printBalance(balance);
  const statement = await store.dispatch({
    action: "getInfo",
    payload: "statement"
  });
  printStatement(statement);
};

const printBalance = balance => {
  console.log(`
|*** *** *** *** *** *** *** *** *** ***|
|                                       |
     Your current balance is: $${balance}  
|                                       |
|*** *** *** *** *** *** *** *** *** ***|
`);
};

const printStatement = statement => {
  options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "America/New_York"
  };
  statement.forEach(element => {
    console.log(`
|*** *** *** *** *** *** *** *** *** ***|
|                                       |
    ACTION TAKEN: ${element.action}  
    AMOUNT: ${element.payload} 
    TIMESTAMP: ${new Intl.DateTimeFormat("en-US", options).format(element.date)}
|                                       |
|*** *** *** *** *** *** *** *** *** ***|
`);
  });
};

main();
