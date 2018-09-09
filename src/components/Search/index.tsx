import React, { Component, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { SearchList } from '../SearchList'

interface ISearch {
	search: any
	doSearch: any
	getSymbolList: any
}

class Search extends Component<ISearch, any> {

	search: any

	constructor(props: any) {
		super(props);
		this.search = debounce(this._search, 200);
	}

	_typeHandler = (e: ChangeEvent<any>): void => {
		this.search(e.target.value);
	}

	_search = (searchText: any) => {
		console.log('-searchText-',searchText)
		const { doSearch } = this.props;
		doSearch({ term: searchText.replace('/', '') });
	};

	componentWillMount() {
		const { search } = this.props;
		const results = search.get('results')
		if (!results || results.size === 0) {
			this.props.getSymbolList()
		}

	}

	render() {

		return (
			<div>
				<input type='text' onChange={this._typeHandler} ></input>
				<SearchList list={this.props.search.get('subset').toJS()} />
			</div>
		);
	}
}


export { Search }
