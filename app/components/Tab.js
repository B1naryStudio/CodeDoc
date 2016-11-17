import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as projectWindowActions from '../actions/projectWindow';


// import '../../node_modules/react-tabtab/public/stylesheets/default.css';
// import '../../node_modules/react-tabtab/public/stylesheets/folder.css';
// import '../../node_modules/react-tabtab/public/stylesheets/modern.css';
import './Tab.module.css';
import { Tabs, Panel } from 'react-tabtab';

class Tab extends Component {

	constructor(props) {
		super(props);

		this.props = props;
		this.state = {};
	}

	openFile(tabKey) {
		if (tabKey === this.props.activeFile.tabKey) {
			return;
		}
		let file = this.props.openedFiles.find((item) => item.tabKey === tabKey);
		this.props.openFile(file);
	}

	closeFile() {
		this.props.closeFile();
	}

	beginDrag() {
		console.log('beginDrag')
		this.props.beginDrag();
	//this.setState({beginDrag: 'beginDrag'});
	}

	setMoveData(dragIndex, hoverIndex) {
		//console.log(dragIndex, '-' ,hoverIndex)
		this.props.changeTabPosition(dragIndex, hoverIndex);
	// var data = this.myState.data;
	// var dragData = data[dragIndex];
	// data.splice(dragIndex, 1);
	// data.splice(hoverIndex, 0, dragData);
	// this.myState.data = data;
	}

	renderTabs(tabs) {
		return tabs.map((item, index) => {
			let postfix = ".md";
			let type = item.name.substring(item.name.length - 3);
			if (type == ".md")
				postfix = "";
			return (<Panel title={ item.name + postfix } key={ item.tabKey } />);
		});
	}


	render() {
		const allTabs = this.renderTabs(this.props.openedFiles);
		return (
			<div>
     <Tabs tabDeleteButton={ true } handleTabDeleteButton={ this.closeFile.bind(this) } activeKey={ this.props.activeFile.tabKey } handleTabClick={ this.openFile.bind(this) } draggable={ true }
       beginDrag={ this.beginDrag.bind(this) } setMoveData={ this.setMoveData.bind(this) }>
       { allTabs }
     </Tabs>
   </div>
			);
	}

}

function mapStateToProps(state) {
	return {
		openedFiles: state.projectWindow.openedFiles,
		activeFile: state.projectWindow.activeFile,
		dragAndDrop: state.projectWindow.dragAndDrop
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(projectWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab)