import React, { Component } from 'react';
import { Link } from 'react-router';
import './Home.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChangeModeActions from '../actions/modemanager';

export default class Home extends Component {
	
	constructor(props) {
		super(props);
		this.props = props;
	}

	openFile(evt) {
		this.props.openFile(true);
	}

	openDocumenting(evt) {
		this.props.openDocumenting(true);
	}

	openLineCommenting(evt) {
		this.props.openLineCommenting(true);
	}

	newFile(evt){
		this.props.createNewFile(true);
	}

	render() {
		return (
			<div className="homeBody">
				<div className="container">
					<h2>CodeDoc</h2>
					<div>
						<br></br>
						<div className="row">
							
							<div className="col-md-3 col-sm-6 col-xs-12">
							<a ref='#/md-file-mode' onClick={ this.newFile.bind(this) } className="btn btn-primary btn-lg btn-block">Create new markdown file</a>
							<br></br>

							<div className="list-group last-files">
							</div>
							</div>

							<div className="col-md-3 col-sm-6 col-xs-12">
							<a ref='#/md-file-mode' onClick={ this.openFile.bind(this) } className="btn btn-primary btn-lg btn-block">Open new markdown file</a>
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

							<div className="col-md-3 col-sm-6 col-xs-12">
							<a onClick={ this.openDocumenting.bind(this) } className="btn btn-primary btn-lg btn-block btn-huge">Create new project documentation</a>
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

							<div className="col-md-3 col-sm-6 col-xs-12">
							<a onClick={ this.openLineCommenting.bind(this) } className="btn btn-primary btn-lg btn-block btn-huge">Create new none by line doc</a>
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
