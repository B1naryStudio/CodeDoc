import React, { Component } from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



export default class Toolbar extends Component {
	constructor(props) {
		super(props);
	}

	undoAction() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.undoAction();
		setTimeout(function(){textarea.focus()}, 0);
	}

	redoAction() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.redoAction();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addBoldText() {		
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addBoldText();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addItalicText() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addItalicText();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addBlockQuote() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addBlockQuote();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addComment() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addComment();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addCodeStyle() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addCodeStyle();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addSimpleList() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addSimpleList();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addNumList() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addNumList();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addHorizRule() {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addHorizRule();
		setTimeout(function(){textarea.focus()}, 0);
	}

	addHeaderToText(count) {
		var textarea = document.getElementsByTagName('textarea')[0];
		this.props.addHeader(count);
		setTimeout(function(){textarea.focus()}, 0);
	}

	addLinkToText() {
		this.props.showModalWindow('simpleLink');
	}

	addTheImageLinkToText() {
		this.props.showModalWindow('imageLink');
	}

	render() {
		return (
			<div className="btn-toolbar">
				<div className="btn-group" role="group" aria-label="...">
					<button disabled={!this.props.mainWindow.pastStates.length} className="btn btn-default" onClick={this.undoAction.bind(this)} data-toggle="tooltip" title="Undo"><i className="fa fa-reply"></i></button>
					<button disabled={!this.props.mainWindow.futureStates.length} className="btn btn-default" onClick={this.redoAction.bind(this)} data-toggle="tooltip" title="Redo"><i className="fa fa-share"></i></button>
					<button className="btn btn-default" onClick={this.addBoldText.bind(this)} data-toggle="tooltip" title="Bold"><b>B</b></button>
					<button className="btn btn-default" onClick={this.addItalicText.bind(this)} data-toggle="tooltip" title="Italic"><i>I</i></button>
					<button className="btn btn-default" onClick={this.addHeaderToText.bind(this, 1)} data-toggle="tooltip" title="Large heading">H1</button>
					<button className="btn btn-default" onClick={this.addHeaderToText.bind(this, 2)} data-toggle="tooltip" title="Medium heading">H2</button>
					<button className="btn btn-default" onClick={this.addHeaderToText.bind(this, 3)} data-toggle="tooltip" title="Small heading">H3</button>
					<button className="btn btn-default" onClick={this.addLinkToText.bind(this)} data-toggle="tooltip" title="Link"><i className="fa fa-link"></i></button>
					<button className="btn btn-default" onClick={this.addTheImageLinkToText.bind(this)} data-toggle="tooltip" title="Image"><i className="fa fa-image"></i></button>
					<button className="btn btn-default" onClick={this.addBlockQuote.bind(this)} data-toggle="tooltip" title="Quote"><i className="fa fa-quote-left"></i></button>
					<button className="btn btn-default" onClick={this.addComment.bind(this)} data-toggle="tooltip" title="Comment"><i className="fa fa-comment"></i></button>
					<button className="btn btn-default" onClick={this.addCodeStyle.bind(this)} data-toggle="tooltip" title="Code"><i className="fa fa-code"></i></button>
					<button className="btn btn-default" onClick={this.addSimpleList.bind(this)} data-toggle="tooltip" title="Unodered list"><i className="fa fa-list"></i></button>
					<button className="btn btn-default" onClick={this.addNumList.bind(this)} data-toggle="tooltip" title="Ordered list"><i className="fa fa-list-ol"></i></button>
					<button className="btn btn-default" onClick={this.addHorizRule.bind(this)} data-toggle="tooltip" title="Horizontal rule"><i className="fa fa-ellipsis-h"></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
