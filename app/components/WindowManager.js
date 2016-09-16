import React, { Component } from 'react';
import { Link } from 'react-router';
import * as showWindowActions from '../actions/windowManager'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



class WindowManager extends Component {
	constructor(props) {
		super(props);
	}

	undoAction() {
        
		// var textarea = document.getElementsByTagName('textarea')[0];
		// this.props.undoAction();
		// setTimeout(function(){textarea.focus()}, 0);
	}

	showCodeWindow() {
		this.props.showCodeWindow();
	}

	showResultWindow() {
		this.props.showResultWindow();
	}

	render() {
		const codeClassName = (this.props.windowManager.showCode ? 'active ' : ' ') + 'btn btn-default';
		const resultClassName = (this.props.windowManager.showResult ? 'active ' : ' ') + 'btn btn-default';		
		return (
				<div className="btn-group" role="group" aria-label="...">
					<button className={codeClassName} onClick={this.showCodeWindow.bind(this)} data-toggle="tooltip" title="Show code">
						<i className='fa fa-file-code-o'></i>
					</button>
					<button className={resultClassName} onClick={this.showResultWindow.bind(this)} data-toggle="tooltip" title="Show result">
						<i className='fa fa-eye'></i>
					</button>
				</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		windowManager: state.windowManager
		//mainWindow: state.mainWindow
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(showWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowManager)
