import React, { Component } from 'react';

interface ISearch {
	search: any
	doSearch: any
	getSymbolList: any
}

class Search extends Component<ISearch,any> {

	constructor (props: any) {
		super(props)
	}

	componentWillMount() {
		const { search } = this.props;
		const results = search.get('results')
		if(!results || results.size === 0){
			this.props.getSymbolList()
		}

	}

	render() {

		return (
			<div>
				Search
			</div>
		);
	}
}


export { Search }
