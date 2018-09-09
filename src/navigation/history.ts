import * as History from 'history';
// configure, create, and export the project's history instance
// so that every other module gets the same instance of history

const getHistory = (): History.History => History.createHashHistory();

const history = getHistory();

export  { history }
