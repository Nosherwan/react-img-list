import React, { Component, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { SearchList } from '../SearchList'
const styles = require('./styles.css');

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
		console.log('-searchText-', searchText)
		const { doSearch } = this.props;
		doSearch({ term: searchText.replace('/', '') });
	};

	componentWillMount() {
		const { search } = this.props;
		const results = search.get('results')
		if (!results.size) {
			this.props.getSymbolList();
		}
	}

	render() {

		return (
			<div className={styles.search_container}>
				<input
					className={styles.search_box}
					type='text'
					onChange={this._typeHandler} >
				</input>
				<SearchList list={this.props.search.get('subset')} />
			</div>
		);
	}
}


export { Search }
