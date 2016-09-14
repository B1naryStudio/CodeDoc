import React, { Component } from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



class ContentManager extends Component {
	constructor(props) {
		super(props);
	}

	undoAction() {
        
		// var textarea = document.getElementsByTagName('textarea')[0];
		// this.props.undoAction();
		// setTimeout(function(){textarea.focus()}, 0);
	}

	render() {
		return (
			<div className="btn-toolbar">
				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default" onClick={this.addBoldText.bind(this)} data-toggle="tooltip" title="Bold"><b>B</b></button>
					<button className="btn btn-default" onClick={this.addItalicText.bind(this)} data-toggle="tooltip" title="Italic"><i>I</i></button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		toolbarState: state.toolbar,
		mainWindow: state.mainWindow
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(mainWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentManager)
