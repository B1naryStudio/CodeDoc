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
    this.myState = {
      openedFiles:  [
        {
          name: "Tab1",
          content: "content 1"
        },
        {
          name: "Tab2",
          content: "content 2"
        },
        {
          name: "Tab3",
          content: "content 3"
        }
      ]
    }
  }

	beginDrag() {
    //this.setState({beginDrag: 'beginDrag'});
  }

  setMoveData(dragIndex, hoverIndex) {
    var data = this.myState.data;
    var dragData = data[dragIndex];
    data.splice(dragIndex, 1);
    data.splice(hoverIndex, 0, dragData);
    this.myState.data = data;
  }

	renderTabs(tabs) {
		if(Array.isArray(tabs)){
			return tabs.map((item, index) => {
				return (<Panel title={item.name} key={index} />
                  
                );
			});
			} else {
			return (<Panel title={tabs.name} key={0} />
                  
               );
		}
	}


	render() {
		const allTabs = this.renderTabs(this.props.openedFiles);
		return (
			<div>
				<Tabs 
						tabDeleteButton={true}

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
		count: state.projectWindow.count
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(projectWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab)