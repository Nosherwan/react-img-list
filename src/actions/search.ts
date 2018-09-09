import { ActionTypes } from '../constants';
import Api from '../api'

function fetchSymbolList() {
  return Api.getJSON('ref-data/symbols', { authorization: false })
}

// function getSearchResults(symbol: string) {
//   return Api.getJSON(`?${symbol}`, { authorization: false })
// }

function doSearch({ term }: { term: string }) {
  return {
    type: ActionTypes.COMPANY_SEARCH,
    payload: term
  };
}

function getSymbolList() {
    return {
      type: ActionTypes.SYMBOL_FETCH,
      payload: fetchSymbolList()
    };
}

export {
  doSearch,
  getSymbolList
}
