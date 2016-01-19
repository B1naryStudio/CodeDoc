import React, { Component } from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/main-window'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {value: props.initialValue};
	}

	addHeader(e, count) {
		this.props.addHeader(count);
	}

	render() {
		return (
			<div className="btn-toolbar">
				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default" onClick={this.props.addBoldText}><i className="fa fa-bold"></i></button>
					<button className="btn btn-default" onClick={this.props.addItalicText}><i className="fa fa-italic"></i></button>
					<button className="btn btn-default" onClick={this.props.addHeader.bind(this, 1)}><i className="fa fa-header">1</i></button>
					<button className="btn btn-default" onClick={this.props.addHeader.bind(this, 2)}><i className="fa fa-header">2</i></button>
					<button className="btn btn-default" onClick={this.props.addHeader.bind(this, 3)}><i className="fa fa-header">3</i></button>
				</div>

				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default" onClick={this.props.addLink}><i className="fa fa-link"></i></button>
					<button className="btn btn-default" onClick={this.props.addImageLink}><i className="fa fa-image"></i></button>
					<button className="btn btn-default" onClick={this.props.addBlockQuote}><i className="fa fa-quote-left"></i></button>
					<button className="btn btn-default" onClick={this.props.addCodeStyle}><i className="fa fa-code"></i></button>
				</div>

				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default" onClick={this.props.addSimpleList}><i className="fa fa-list"></i></button>
					<button className="btn btn-default" onClick={this.props.addNumList}><i className="fa fa-list-ol"></i></button>
					<button className="btn btn-default" onClick={this.props.addHorizRule}><i className="fa fa-ellipsis-h"></i></button>
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
	return bindActionCreators(mainWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
