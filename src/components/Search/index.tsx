import React, { Component, ChangeEvent } from 'react';
import { SearchList } from '../SearchList'
const styles = require('./styles.css');

interface ISearch {
	showOverlay: any
	setPhoto: any
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
		const { setPhoto, showOverlay, list } = this.props;
		return (
			<div>
				<div className={styles.search_container}>
					<SearchList list={list}
						setPhoto={setPhoto}
						showOverlay={showOverlay} />
					<button onClick={this.getMorePhotos}>Load More...</button>
				</div>
			</div>
		);
	}
}

export { Search }
