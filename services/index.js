require('module-alias/register');
const http = require('http'),
      BudgetManagerAPI = require('@BudgetManagerAPI'),
      BudgetManagerServer = http.Server(BudgetManagerAPI),
      BudgetManagerPort = process.env.Port || 3001,
      Local = '0.0.0.0';

BudgetManagerServer.listen(BudgetManagerPort, Local, () => {
    console.log(`BudgetManagerAPI is running on ${BudgetManagerPort}`);
});