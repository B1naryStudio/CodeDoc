import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';


export default class Home extends Component {
	render() {
		return (
			<div>
				<div className={styles.container}>
					<h2>CodeDoc</h2>
					<div className="container">
						<br></br>
						<div className="row">
							<div className="col-md-4">
							<a href="#" className="btn btn-primary btn-lg btn-block btn-huge">Create new file</a>
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
							<a href="#" className="btn btn-primary btn-lg btn-block btn-huge">Create new project</a>
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
							<a href="#/counter" className="btn btn-primary btn-lg btn-block btn-huge">Create new file</a>
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
