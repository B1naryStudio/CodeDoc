import React, { Component } from 'react';
import { Link } from 'react-router';
import Tree, { TreeNode } from 'rc-tree';
import './FilesTree.module.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as projectWindowActions from '../actions/projectWindow';
import * as contextMenuActions from '../actions/contextMenu.actions'

import _ from 'lodash';

const fs = require('fs');
const path = require('path');

// decorators.Header = (props) => {
// 	const style = props.style;
// 	const iconType = props.node.hasDocs ? 'file-text' : 'plus-square-o';
// 	const iconClass = `fa fa-${iconType}`;

// 	const iconStyle = { marginLeft: '5px' };
// 	return (
// 		<div style={style.base}>
// 			<div style={style.title}>
// 				{props.node.name}
// 				<i className={iconClass} style={iconStyle}/>
// 			</div>
// 		</div>
// 	);
// };

class FilesTree extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {};
		this.contextMenu = this.contextMenu.bind(this);
	}
	contextMenu(obj){
		this.props.treeContextMenu(obj.node.props.eventKey, obj.event.clientX, obj.event.clientY);
	}
	onToggle(node, evt) {
		if(this.state.cursor){this.state.cursor.active = false;}
		node.active = true;
		if(node.children){ node.toggled = evt; }
		this.setState({ cursor: node });
		if (node.hasDocs) {
			fs.readFile(node.docsPath, 'utf8', (err, data) => {
				if (err) throw err;
				this.props.loadFile(data, node.docsPath);
			});
		}
	}

	createFile(node){
		this.props.createFile(node);
	}

	openFile(node){
		this.props.openFile(node);
	}

	customLabel(node){
		const iconType = node.hasDocs || node.name.substr(-3) === '.md' ? 'file-text' : 'plus-square-o';
		const iconClass = `fa fa-${iconType}`;
		const iconStyle = { marginLeft: '5px' };
		const action = node.hasDocs || node.name.substr(-3) === '.md' ? this.openFile : this.createFile;
		
		return (
		<span className="cus-label">
			<span onClick={action.bind(this, node)} >
				{node.name}
			</span>
			<i className={iconClass} style={iconStyle}></i>
		</span>)
	}
//this.contextMenu.bind(this, "tree-folder")
	renderTree(node) {
		if(Array.isArray(node)){
			return node.map((item) => {
				if (item.children) {
					return <TreeNode title={this.customLabel(item)} key={item.key}>{this.renderTree(item.children)}</TreeNode>;
				}
				return (<TreeNode title={this.customLabel(item)} key={item.key}/>);
			})
			} else {
			return (<TreeNode title={this.customLabel(node)} key={node.key}>{this.renderTree(node.children)}</TreeNode>);
		}
	}

	activeFileKey(){
		if(this.props.activeFile) return [this.props.activeFile.key];
		else return [];
	}

	render() {
    const treeNodes = this.renderTree(this.props.tree);	
		return (
			<div>
				<Tree showIcon={false}  defaultExpandAll={true} selectedKeys = {this.activeFileKey()}  onRightClick={this.contextMenu}>
					{treeNodes}
      			</Tree>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tree: state.projectWindow.tree,
		activeFile: state.projectWindow.activeFile 
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, projectWindowActions, contextMenuActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesTree)