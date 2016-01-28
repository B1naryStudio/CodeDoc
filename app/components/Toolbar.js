import React, { Component } from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'



export default class Toolbar extends Component {
	constructor(props) {
		super(props);
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
					<button className="btn btn-default" onClick={this.addBoldText.bind(this)}><b>B</b></button>
					<button className="btn btn-default" onClick={this.addItalicText.bind(this)}><i>I</i></button>
					<button className="btn btn-default" onClick={this.addHeaderToText.bind(this, 1)}>H1</button>
					<button className="btn btn-default" onClick={this.addHeaderToText.bind(this, 2)}>H2</button>
					<button className="btn btn-default" onClick={this.addHeaderToText.bind(this, 3)}>H3</button>
				</div>

				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default" onClick={this.addLinkToText.bind(this)}><i className="fa fa-link"></i></button>
					<button className="btn btn-default" onClick={this.addTheImageLinkToText.bind(this)}><i className="fa fa-image"></i></button>
					<button className="btn btn-default" onClick={this.addBlockQuote.bind(this)}><i className="fa fa-quote-left"></i></button>
					<button className="btn btn-default" onClick={this.addComment.bind(this)}><i className="fa fa-comment"></i></button>
					<button className="btn btn-default" onClick={this.addCodeStyle.bind(this)}><i className="fa fa-code"></i></button>
				</div>

				<div className="btn-group" role="group" aria-label="...">
					<button className="btn btn-default" onClick={this.addSimpleList.bind(this)}><i className="fa fa-list"></i></button>
					<button className="btn btn-default" onClick={this.addNumList.bind(this)}><i className="fa fa-list-ol"></i></button>
					<button className="btn btn-default" onClick={this.addHorizRule.bind(this)}><i className="fa fa-ellipsis-h"></i></button>
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
