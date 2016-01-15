import React, { Component } from 'react';
import { Link } from 'react-router';
import Markdown from'react-remarkable';
import { connect } from 'react-redux'

export default class ResultWindow extends Component {
	render() {
		return (
			<div>
				<div>{this.props.toolbarState}</div>
				<Markdown> 
					{this.props.mainWindow.mainWindowText}
				</Markdown>
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

export default connect(mapStateToProps)(ResultWindow)