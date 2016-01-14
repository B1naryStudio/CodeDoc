import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './MDFileMode.module.css';
import Toolbar from '../components/Toolbar';
import TreeView from '../components/TreeView';


export default class MDFileMode extends Component {
	render() {
		return (
			<div>
				<div className={styles.container}>
					<h2>Markdown file mode</h2>
					<Toolbar />
					<TreeView />
				</div>
			</div>
		);
	}
}
