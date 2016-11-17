import React, { Component } from 'react';
import { Link } from 'react-router';
import Tree, { TreeNode } from 'rc-tree';
import './FilesTree.module.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as projectWindowActions from '../actions/projectWindow';
import * as contextMenuActions from '../actions/contextMenu.actions';

import _ from 'lodash';

const fs = require('fs');
const path = require('path');

class ContentTree extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {};
		this.contextMenu = this.contextMenu.bind(this);
	}

	contextMenu(obj) {
		this.props.contentTreeContextMenu(obj.node.props.eventKey, obj.event.clientX, obj.event.clientY);
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

	// onDragStart(info) {
	// 	console.log('start', info);
	// }
	// onDragEnter(info) { 
	// 	console.log('enter', info);
	// }
	onDrop(info) {
		console.log('drop', info);

		const dropKey = info.node.props.eventKey.slice(0, -1);
		const dragKey = info.dragNode.props.eventKey.slice(0, -1);
		// const dragNodesKeys = info.dragNodesKeys;
		const loop = (data, key, callback) => {
			data.forEach((item, index, arr) => {
				//debugger;
				if (item.key === key) {
					//debugger
					return callback(item, index, arr);
				}
				if (item.children) {
					return loop(item.children, key, callback);
				}
			});
		};
		const data = this.props.contentTree.tree;
		console.log('start data', data);
		let dragObj;
		loop(data, dragKey, (item, index, arr) => {
			//debugger;
			arr.splice(index, 1);
			dragObj = item;
		});
		if (info.dropToGap) {
			let ar;
			let i;
			loop(data, dropKey, (item, index, arr) => {
				ar = arr;
				i = index;
			});
			ar.splice(i, 0, dragObj);
		} else {
			loop(data, dropKey, (item) => {
				item.children = item.children || [];
				// where to insert
				item.children.push(dragObj);
			});
		}
		//debugger;
		this.props.changeContentTree(data);
		console.log('result data', data);
	}

	createFile(node) {
		this.props.createFile(node);
	}

	openFile(node) {
		this.props.openFile(node);
	}

	activeFileKey() {
		if (this.props.activeFile) return [this.props.activeFile.key + '7'];
		else return [];
	}

	customLabel(node) {
		//const iconType = node.hasDocs ? 'file-text' : 'plus-square-o';
		//const iconClass = `fa fa-${iconType}`;
		const iconStyle = {
			marginRight: '5px'
		};
		//const action = node.hasDocs ? this.openFile : this.createFile;
		let path = node.docsPath.substring(node.docsPath.indexOf(this.props.basePath) + this.props.basePath.length + 1, node.docsPath.lastIndexOf('/')) + "/";
		return (
			<span className="cus-label" onClick={ this.openFile.bind(this, node) }>
                                                               			<i className='fa fa-file-text-o' style={ iconStyle }></i>
                                                               			<span>
                                                               				{ node.name }
                                                               			</span>
   <span className="cus-label-path">{ path }</span>
   </span>)
	}

	renderTree(node) {
		if (Array.isArray(node)) {
			return node.map((item) => {
				if (item.children) {
					return <TreeNode title={ this.customLabel(item) } key={ item.key + '7' }>
              { this.renderTree(item.children) }
            </TreeNode>;
				}
				return (<TreeNode title={ this.customLabel(item) } key={ item.key + '7' } />);
			});
		} else {
			return (<TreeNode title={ this.customLabel(node) } key={ node.key + '7' }>
             { this.renderTree(node.children) }
           </TreeNode>);
		}
	}

	render() {
		const treeNodes = this.renderTree(this.props.contentTree.tree);
		return (
			<div>
     <Tree showIcon={ false } defaultExpandAll={ true } selectedKeys={ this.activeFileKey() } draggable onDrop={ this.onDrop.bind(this) } onRightClick={ this.contextMenu }>
       { treeNodes }
     </Tree>
   </div>
			);
	}
}

function mapStateToProps(state) {
	return {
		contentTree: state.projectWindow.contentTree,
		basePath: state.projectWindow.tree.name,
		activeFile: state.projectWindow.activeFile,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, projectWindowActions, contextMenuActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentTree)