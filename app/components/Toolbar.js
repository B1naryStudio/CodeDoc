import React, { Component } from 'react';
import { Link } from 'react-router';
import * as toolbarActions from '../actions/toolbar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class Toolbar extends Component {
	render() {
		return (
			<div className="btn-toolbar">
				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default" onClick={this.props.boldText}><i className="fa fa-bold"></i></button>
					<button className="btn btn-default"><i className="fa fa-italic"></i></button>
					<button className="btn btn-default"><i className="fa fa-header">1</i></button>
					<button className="btn btn-default"><i className="fa fa-header">2</i></button>
					<button className="btn btn-default"><i className="fa fa-header">3</i></button>
				</div>

				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default"><i className="fa fa-link"></i></button>
					<button className="btn btn-default"><i className="fa fa-image"></i></button>
					<button className="btn btn-default"><i className="fa fa-quote-left"></i></button>
					<button className="btn btn-default"><i className="fa fa-code"></i></button>
				</div>

				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default"><i className="fa fa-list"></i></button>
					<button className="btn btn-default"><i className="fa fa-list-ol"></i></button>
					<button className="btn btn-default"><i className="fa fa-ellipsis-h"></i></button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		toolbarState: state.toolbar
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(toolbarActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
