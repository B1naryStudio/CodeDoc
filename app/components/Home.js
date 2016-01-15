import React, { Component } from 'react';
import { Link } from 'react-router';
import './Home.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChangeModeActions from '../actions/modemanager';

export default class Home extends Component {
	
	createNewFile(evt, obj) {
		this.props.createNewFile('#/');
	}

	openDocumenting() {
		this.props.createNewFile('#/counter');
	}

	openLineCommenting() {
		this.props.createNewFile('#/');
	}

	render() {
		return (
			<div className="homeBody">
				<div className="container">
					<h2>CodeDoc</h2>
					<div>
						<br></br>
						<div className="row">
							<div className="col-md-4">
							<a ref='#/md-file-mode' onClick={this.createNewFile} className="btn btn-primary btn-lg btn-block">Create new markdown file</a>
							<br></br>
							<span>Last files...</span>
							<div className="list-group last-files">
								<a href="#" className="list-group-item">File1.md</a>
								<a href="#" className="list-group-item">File2.md</a>
								<a href="#" className="list-group-item">Документ1.md</a>
								<a href="#" className="list-group-item">File3.md</a>
								<a href="#" className="list-group-item">asdadwawd.md</a>
							</div>
							</div>

							<div className="col-md-4">
							<a onClick={this.openDocumenting} className="btn btn-primary btn-lg btn-block btn-huge">Create new project documentation</a>
							<br></br>
							<span>Last projects...</span>
							<div className="list-group last-files">
								<a href="#" className="list-group-item">Project1</a>
								<a href="#" className="list-group-item">Project2</a>
								<a href="#" className="list-group-item">Новая папка1</a>
								<a href="#" className="list-group-item">Project3</a>
								<a href="#" className="list-group-item">tdfghtfh</a>
							</div>
							</div>

							<div className="col-md-4">
							<a onClick={this.openLineCommenting} className="btn btn-primary btn-lg btn-block btn-huge">Create new none by line doc</a>
							<br></br>
							<span>Last files...</span>
							<div className="list-group last-files">
								<a href="#" className="list-group-item">File1.md</a>
								<a href="#" className="list-group-item">File2.md</a>
								<a href="#" className="list-group-item">Документ1.md</a>
								<a href="#" className="list-group-item">File3.md</a>
								<a href="#" className="list-group-item">asdadwawd.md</a>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.counter
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ChangeModeActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)