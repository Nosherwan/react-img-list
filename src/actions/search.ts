import { ActionTypes } from '../constants';
import Api from '../api'

function fetchSymbolList () {
  return Api.getJSON('ref-data/symbols', { authorization: false })
}

function getSearchResults (symbol: string) {
  return Api.getJSON(`?${symbol}`, { authorization: false })
}

function search({ term }: {term: string}) {
  return {
    type: ActionTypes.COMPANY_SEARCH,
    payLoad: getSearchResults(term)
  };
}

function getSymbolList() {
  return {
    type: ActionTypes.COMPANY_SEARCH,
    payLoad: fetchSymbolList()
  };
}

export {
  search,
  getSymbolList
}
