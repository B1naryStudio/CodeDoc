import React, { Component } from 'react';
import { Link } from 'react-router';
import Markdown from'react-remarkable';
import { connect } from 'react-redux'

let dispatchScrollEvent = true;

export default class ResultWindow extends Component {

	componentDidMount() {
		var res = document.getElementsByClassName('res-window-container')[0];

		res.addEventListener('scroll', this.handleScroll);
		res.addEventListener('main-scroll', this.handleMainScroll);
	}

	componentWillUnmount() {
		var res = document.getElementsByClassName('res-window-container')[0];
		
		res.removeEventListener('scroll', this.handleScroll);
		res.removeEventListener('main-scroll', this.handleMainScroll);
	}

	handleScroll(event) {
		if (dispatchScrollEvent) {
			document.getElementsByTagName('textarea')[0].dispatchEvent(new Event('res-scroll'));
		}
	}

	handleMainScroll(event) {
		var res = document.getElementsByClassName('res-window-container')[0];
		var main = document.getElementsByTagName('textarea')[0];
		dispatchScrollEvent = false;
		res.scrollTop = (main.scrollTop / (main.scrollHeight - main.offsetHeight)) * (res.scrollHeight - res.offsetHeight);
		setTimeout(function() {dispatchScrollEvent = true}, 100);
	}

	render() {
		return (
			<div ref={(resWindow) => this._resWindow = resWindow}>
				<Markdown> 
					{this.props.mainWindow.mainWindowText}
				</Markdown>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		mainWindow: state.mainWindow
	}
}

export default connect(mapStateToProps)(ResultWindow)