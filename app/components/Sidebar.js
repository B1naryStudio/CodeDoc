import React, { Component } from 'react';
import { Link } from 'react-router';
import {Treebeard, decorators} from 'react-treebeard';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as projectWindowActions from '../actions/projectWindow';
import _ from 'lodash';

const fs = require('fs');
const path = require('path');

decorators.Header = (props) => {
	const style = props.style;
	const iconType = props.node.hasDocs ? 'file-text' : 'plus-square-o';
	const iconClass = `fa fa-${iconType}`;

	const iconStyle = { marginLeft: '5px' };
	return (
		<div style={style.base}>
			<div style={style.title}>
				{props.node.name}
				<i className={iconClass} style={iconStyle}/>
			</div>
		</div>
	);
};

export default class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		//this.onToggle = this.onToggle.bind(this);
	}

	onToggle(node, toggled) {
		if(this.state.cursor){this.state.cursor.active = false;}
		node.active = true;
		if(node.children){ node.toggled = toggled; }
		this.setState({ cursor: node });
		if (node.hasDocs) {
			fs.readFile(node.docsPath, 'utf8', (err, data) => {
				if (err) throw err;
				this.props.loadFile(data, node.docsPath);
			});
		}
	}

	render() {
		return (
			<div>
				<Treebeard
					data={this.props.tree}
					onToggle={this.onToggle.bind(this)}
					decorators={decorators}
				/>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		tree: state.projectWindow.tree
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(projectWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)