import React, { Component } from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class MainWindow extends Component {
	static defaultProps = {initialValue: ''};

	constructor(props) {
		super(props);
	}

	tick(e) {
		let cursorPosition = this.getSelectedText(e);
		this.props.changeText(e.target.value, cursorPosition);
	}

	selectText(e){
		let cursorPosition = this.getSelectedText(e);
		this.props.selectText(e.target.value, cursorPosition);
	}

	getSelectedText(e){
		this.cursorPosition = {};
		this.cursorPosition.start = e.target.selectionStart;
		this.cursorPosition.end = e.target.selectionEnd;
		return this.cursorPosition;
	}

	render() {
		return (
			<textarea className="form-control" value={this.props.mainWindow.mainWindowText} onChange={this.tick.bind(this)} onBlur={this.selectText.bind(this)}></textarea>
		);
	}
}

function mapStateToProps(state) {
	return {
		mainWindow: state.mainWindow
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(mainWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow)