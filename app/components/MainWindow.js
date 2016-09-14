import React, { Component } from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/github';

let dispatchScrollEvent = true;

class MainWindow extends Component {
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

	updateSelection() {
		this._textarea.setSelectionRange(this.props.mainWindow.cursorPosition.start, this.props.mainWindow.cursorPosition.end);
	}

	componentDidMount() {
		this._textarea.focus();
		this._textarea.addEventListener('scroll', this.handleScroll);
		this._textarea.addEventListener('res-scroll', this.handleResScroll.bind(this));
	}

	componentWillUnmount() {
		this._textarea.removeEventListener('scroll', this.handleScroll);
		this._textarea.removeEventListener('res-scroll', this.handleResScroll.bind(this));
	}

	handleScroll(event) {
		if (dispatchScrollEvent) {
			document.getElementsByClassName('res-window-container')[0].dispatchEvent(new Event('main-scroll'));
		}
	}

	handleResScroll(event) {
		var res = document.getElementsByClassName('res-window-container')[0];
		dispatchScrollEvent = false;
		this._textarea.scrollTop = (res.scrollTop / (res.scrollHeight - res.offsetHeight)) * (this._textarea.scrollHeight - this._textarea.offsetHeight);
		setTimeout(function() {dispatchScrollEvent = true}, 100);
	}

	onKeyDown(e) {
		if (e.which === 90 && e.ctrlKey) {
			e.preventDefault();
			if (this.props.mainWindow.pastStates.length) {
				this.props.undoAction();
			}
		}
		if (e.which === 89 && e.ctrlKey) {
			e.preventDefault();
			if (this.props.mainWindow.futureStates.length) {
				this.props.redoAction();
			}
		}
	}

	onKeyPress(e) {
		if ((e.which === 13) && !e.shiftKey) {
			let textarea = document.getElementsByTagName('textarea')[0];
			let mW = this.props.mainWindow;
			let cursorLine = 'N/A';
			let arr = mW.mainWindowText.split('\n');
			let sum = 0;
			arr.forEach(function(el, index) {
				sum += (el.length + 1);
				if ((sum > mW.cursorPosition.start) && (cursorLine === 'N/A')) {
					cursorLine = index;
				}
			});
			if (arr[cursorLine].substring(0, 3) === "1. ") {
				textarea.blur();
				this.props.addNumList();
				setTimeout(function(){textarea.focus()}, 0);
			}else if (arr[cursorLine].substring(0, 2) === "+ ") {
				textarea.blur();
				this.props.addSimpleList();
				setTimeout(function(){textarea.focus()}, 0);
			}
		}
	}

	onload(editor){
		console.log('onload'+ editor)
	        editor.getSession().setUseWrapMode(true);
	    }

	/*<textarea ref={(textarea) => this._textarea = textarea} className="form-control" onKeyDown={this.onKeyDown.bind(this)} onKeyPress={this.onKeyPress.bind(this)} onFocus={this.updateSelection.bind(this)} value={this.props.mainWindow.mainWindowText} onChange={this.tick.bind(this)} onSelect={this.selectText.bind(this)}></textarea>*/
	render() {
		return (
			/*<div style={{width:'100%',height:'100%'}}>
				<AceEditor
					mode="markdown"
					theme="github"
					name="UNIQUE_ID_OF_DIV"
					width="100%"
					height="100%"
					fontSize={17}
					editorProps={{$blockScrolling: true}}
					onLoad={this.onload}
					//value={this.props.mainWindow.mainWindowText}
					//onChange={this.tick.bind(this)}


					ref={(textarea) => this._textarea = textarea}
					className="form-control"
					onKeyDown={this.onKeyDown.bind(this)}
					onKeyPress={this.onKeyPress.bind(this)}
					onFocus={this.updateSelection.bind(this)}
					value={this.props.mainWindow.mainWindowText}
					onChange={this.tick.bind(this)}
					onSelect={this.selectText.bind(this)}
				/>
			</div>*/
			<textarea ref={(textarea) => this._textarea = textarea} className="form-control" onKeyDown={this.onKeyDown.bind(this)} 
			onKeyPress={this.onKeyPress.bind(this)} onFocus={this.updateSelection.bind(this)} value={this.props.mainWindow.mainWindowText} 
			onChange={this.tick.bind(this)} onSelect={this.selectText.bind(this)}></textarea>
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