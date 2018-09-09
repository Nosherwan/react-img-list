import { ActionTypes } from '../constants';
import Api from '../api'

function fetchSymbolList() {
  return Api.getJSON('ref-data/symbols', { authorization: false })
}

function getSearchResults(symbol: string) {
  return Api.getJSON(`?${symbol}`, { authorization: false })
}

function doSearch({ term }: { term: string }) {
  return {
    type: ActionTypes.COMPANY_SEARCH,
    payload: getSearchResults(term)
  };
}

function getSymbolList() {
    return {
      type: ActionTypes.COMPANY_SEARCH,
      payload: fetchSymbolList()
    };
}

export {
  doSearch,
  getSymbolList
}
