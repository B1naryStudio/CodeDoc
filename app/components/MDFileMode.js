import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';


export default class MDFileMode extends Component {
	render() {
		return (
			<div>
				<div className={styles.container}>
					<h2>Markdown file mode</h2>
				</div>
			</div>
		);
	}
}
