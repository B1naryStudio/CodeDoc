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

function getFileTree(folderPath, ignore = [], base = folderPath) {
	let stats = fs.lstatSync(folderPath),
			tree = {
				path: folderPath,
				hasDocs: false,
				name: path.basename(folderPath)
			};
	let docsPath = path.join(base, '.codedoc', folderPath.substring(base.length, folderPath.length - (stats.isDirectory() ? 0 : path.basename(folderPath).length)), (path.basename(folderPath) + '.md'));
	try {
		fs.accessSync(docsPath, fs.F_OK);
		tree.hasDocs = true;
		tree.docsPath = docsPath;
	} catch (e) {
		// It isn't accessible
	}
	if (stats.isDirectory()) {
		let filteredChildren = fs.readdirSync(folderPath).filter(function(child) {
			return !_.find(ignore, function(item) {
				return item === child;
			});
		});
		tree.children = filteredChildren.map(function(child) {
			return getFileTree(path.join(folderPath, child), ignore, base);
		});
		tree.children.sort(function(a, b) {
			let A = a.children ? 1 : 0;
			let B = b.children ? 1 : 0;
			if ((B - A) === 0) {
				return (b.name > a.name) ? -1 : 1;
			}
			return B - A;
		});
	}
	return tree;
}

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

	reloadTree(e) {
		fs.readFile(path.join(this.props.tree.path, '.codedoc/docsConfig.json'), 'utf8', (err, data) => {
			if (err) throw err;
			let ignore = JSON.parse(data).ignore;
			var tree = getFileTree(this.props.tree.path, ignore);
			tree.toggled = true;
			this.props.loadTree(tree);
		});
	}

	render() {
		return (
			<div>
				<div>
					<button className='btn btn-default' onClick={this.reloadTree.bind(this)}>refresh</button>
				</div>
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