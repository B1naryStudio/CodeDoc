import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as projectWindowActions from '../actions/projectWindow';


import '../../node_modules/react-tabtab/public/stylesheets/default.css';
import '../../node_modules/react-tabtab/public/stylesheets/folder.css';
import '../../node_modules/react-tabtab/public/stylesheets/modern.css';
import '../../node_modules/react-tabtab/public/stylesheets/side.css';
import {Tabs, Panel} from 'react-tabtab';

export default class Tab extends Component {

constructor(props) {
    super(props);
		
		this.props = props;
		this.state = {};
  }

	openFile(key){
		console.log(key);
		let file = this.props.openedFiles.find((item) => item.key === key);
		this.props.openFile(file);
	}

	beginDrag() {
    //this.setState({beginDrag: 'beginDrag'});
  }

  setMoveData(dragIndex, hoverIndex) {
    // var data = this.myState.data;
    // var dragData = data[dragIndex];
    // data.splice(dragIndex, 1);
    // data.splice(hoverIndex, 0, dragData);
    // this.myState.data = data;
  }

	renderTabs(tabs) {
			return tabs.map((item, index) => {
				return (<Panel title={item.name} key={item.key}  />
                  
                );
			});
	}


	render() {
		const allTabs = this.renderTabs(this.props.openedFiles);
		return (
			<div>
				<Tabs 
						tabDeleteButton={true}
						activeKey={this.props.activeFile.key}
						handleTabClick={this.openFile.bind(this)}
						draggable={true}
						beginDrag={this.beginDrag.bind(this)}
						setMoveData={this.setMoveData.bind(this)}>
						{allTabs}
				</Tabs>
			</div>
		);
	}	  

}

function mapStateToProps(state) {
	return {
		openedFiles: state.projectWindow.openedFiles,
		activeFile: state.projectWindow.activeFile
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(projectWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab)