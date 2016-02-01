import React, { Component } from 'react';
import { Link } from 'react-router';
import Tree from 'react-ui-tree';
/*import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'*/
import { connect } from 'react-redux';


export default class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	renderNode(node) {
		return (
			<span className={'dfsaa'} onClick={this.onClickNode.bind(null, node)}>
				{node.module}
			</span>
		);
	}

	onClickNode() {

	}

	render() {
		return (
			<Tree
				paddingLeft={20}
				tree={this.props.tree}
				onChange={this.handleChange}
				renderNode={this.renderNode.bind(this)}
				isNodeCollapsed={true}
			/>
		);
	}
}


function mapStateToProps(state) {
	console.log(state);
	return {
		tree: state.projectWindow.tree
	}
}

export default connect(mapStateToProps)(Sidebar)