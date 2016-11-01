import React, { Component } from 'react';
import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SyntaxHighlighter  from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

let dispatchScrollEvent = true;

class CodeWindow extends Component {
	static defaultProps = {initialValue: ''};

	constructor(props) {
		super(props);
	}

//ref={(textarea) => this._textarea = textarea}

	render() {
		return (
			<SyntaxHighlighter  language='javascript' style={docco} >
				{this.props.mainWindow.mainWindowCode}
			</SyntaxHighlighter>
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeWindow)