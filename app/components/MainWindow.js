import React, { Component } from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/main-window'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class MainWindow extends Component {
	static defaultProps = {initialValue: ''};

	constructor(props) {
		super(props);
		this.state = {value: props.initialValue};
	}

	tick(e) {
		this.setState({value: e.target.value});
		this.props.changeText(e.target.value);
	}

	render() {
		return (
			<textarea className="form-control" value={this.state.value} onChange={this.tick.bind(this)}></textarea>
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