import React, { Component, ChangeEvent } from 'react';
import { SearchList } from '../SearchList'
const styles = require('./styles.css');

interface ISearch {
	getPhotos: any
	count: number
	list: any
}

class Search extends Component<ISearch, any> {

	constructor(props: any) {
		super(props);
	}

	componentWillMount() {
		const { count, list, getPhotos } = this.props;
		const results = list;
		if (!results.size) {
			getPhotos(count);
		}
	}

	getMorePhotos = () => {
		this.props.getPhotos(this.props.count)
	}

	render() {
		return (
			<div>
				<div className={styles.search_container}>
					<SearchList list={this.props.list} />
				</div>
				<button onClick={this.getMorePhotos}>Load More...</button>
			</div>
		);
	}
}

export { Search }
