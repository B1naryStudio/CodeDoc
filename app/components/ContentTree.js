import React, { Component } from 'react';
import { Link } from 'react-router';
import Tree, { TreeNode } from 'rc-tree';
import './FilesTree.module.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as projectWindowActions from '../actions/projectWindow';

import _ from 'lodash';

const fs = require('fs');
const path = require('path');

class ContentTree extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {};
	}

	onToggle(node, evt) {
		// if(this.state.cursor){this.state.cursor.active = false;}
		// node.active = true;
		// if(node.children){ node.toggled = evt; }
		// this.setState({ cursor: node });
		// if (node.hasDocs) {
		// 	fs.readFile(node.docsPath, 'utf8', (err, data) => {
		// 		if (err) throw err;
		// 		this.props.loadFile(data, node.docsPath);
		// 	});
		// }
	}

	createFile(node){
		this.props.createFile(node);
	}

	openFile(node){
		this.props.openFile(node);
	}

	customLabel(node){
		//const iconType = node.hasDocs ? 'file-text' : 'plus-square-o';
		//const iconClass = `fa fa-${iconType}`;
		const iconStyle = { marginRight: '5px' };
		//const action = node.hasDocs ? this.openFile : this.createFile;
		
		return (
		<span className="cus-label" onClick={this.openFile.bind(this, node)}>
			<i className='fa fa-file-text-o' style={iconStyle}></i>
			<span>
				{node.name}
			</span>
		</span>)
	}

	renderTree(node) {
		if(Array.isArray(node)){
			return node.map((item) => {
				if (item.children) {
					return <TreeNode title={this.customLabel(item)} key={item.key + '7'} >{this.renderTree(item.children)}</TreeNode>;
				}
				return (<TreeNode title={this.customLabel(item)} key={item.key + '7'} />);
			});
			} else {
			return (<TreeNode title={this.customLabel(node)} key={node.key + '7'} >{this.renderTree(node.children)}</TreeNode>);
		}
	}

	activeFileKey(){
		if(this.props.activeFile) return [this.props.activeFile.key + '7'];
		else return [];
	}

	render() {
    const treeNodes = this.renderTree(this.props.contentTree.tree);
		return (
			<div>
				<Tree showIcon={false}  defaultExpandAll={true} selectedKeys = {this.activeFileKey()}  >
					{treeNodes}
      			</Tree>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		contentTree: state.projectWindow.contentTree,
		//contentTreeCount: state.projectWindow
		activeFile: state.projectWindow.activeFile,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(projectWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentTree)