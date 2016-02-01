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

	openMarkdownFile(evt) {
		this.props.openMarkdownFile(true);
	}

	createProjectComments(evt) {
		this.props.createProjectComments(true);
	}

	openProjectComments(evt) {
		this.props.openProjectComments(true);
	}

	createProjectDocs(evt) {
		this.props.createProjectDocs(true);
	}

	openProjectDocs(evt) {
		this.props.openProjectDocs(true);
	}

	createMarkdownFile(evt) {
		this.props.createMarkdownFile(true);
	}

	render() {
		return (
			<div className="homeBody">
				<div className="container">
				<h2 className="codeDocLogo">&lt;/&gt; CodeDoc</h2>
					<div>

						<div className="row">
							<div className="col-md-6 col-sm-6 menu-group">
								<div className="menu-group-icon">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEvklEQVR4Xu2cTVbUQBSFX2XgVHYgrkBcgbgDHJLgAYcaPOIKlBWgR/o4pDmSZiiuAFiB7MBeAk6ckeep/iMp0uTn3KRD52YEnaqb5H79XlW9TmKEW6scMK06G56MEEjLvgQEsixAetFAW3YtJU5H34RB0C/RobGmlSPkYQOx/rYTSoeBtBNKx4G0DwoMSBj4lbWaSND3p9j2pK/KJroX+LCBtCdSCCQVnouPlA4D0Tci5uhuulwslM4CsSm2F0U7bYPSaSA2OtoGpfNA2gaFQCaDSFsihUASo3oboBCIM81aNBQCySgTLBIKgcyp2ywKCoHcU0hbBBQCyalsNg2FQAqUmpuEQiAFgDS5eCSQgkCagkIgJYA0AYVASgKpGwqBVABSJ5TOAqnIoWC36j9yEUhBi8s2q3qPAYGUdbpgewLJXXE3e+srgRT85tbVDHVbVGdSVl0gproEUrfDJfUJpKRhdTcnkLodLqlPICUNq7s5gdTtcEl9AilpWNHmvShaUzUHyfa7W/7LvP4EkudQxf3ffpyue56eJ7sXWeQRSEXD87oRSJ5DDe8nkIYNzzscgeQ51PB+AkkYPr7dxnsy/SgMNvcPjn6uPHr0b1vVbNjPjZFrVTnb3fKPp+3GJsa2zeq4jQ7j2Dt+/3rzYh7P76enqzc3+kFE1pJ97N8c1Ceu9aKBNfDFrYn6XFXOjTErGcaehYH/qhdFRyJmJ9v47F/u5t9nZVW07+p1dpblAlHV6zkwJv7rlYgZfcPnbZ5nnr7d3Bymoyk9rc3LigSSduhSRC9ERlFiI+Gxa6CqHNs0ZVOWMbKd3q/7YRB8nn7WiwZ/RGSU2ibbX5sCbX8Rs56O0HELApl55Zp59yFNVfm4u+V/uTU8+ixiPiUMvwwD3xptnydcEzG/HWDPwyC4SgCzWnZsmW0EMrEijs1Ld2DOWxFnzJKSQObCui+lEUhNQA5PBv10SktHoD0sp72J1OAO6vgISc/i3HRHIM7o3DQQY+TVO98/S54GI6TBCGHKypvgNx4h7gxMf4VBMKoAdHZQPzwZbBtjVuNYLjNmUKmVOn4MKTLtvTNtXt51SC8apOb4bg6vewyxUXAYRUMjZlYvs9UAEdM3xlyLqF31pyJmqReGhyeDK2PkWSJDfA0Dfy+xKKs1QubNovIy69KuQzIG1dTrWpuIkMmKfc5rmUZovqroRjKKlhbIpJS+N64Zad99d+64CntbZ/I8r58sDE7MnNWlxunktk5l/7dl9TiOk9XfYdY7esft1EbnqDipKrYW1rfjmnse7jGyIiqvgpAXhdP9vLe3qFM57QgEZCRKhkBQToJ0CARkJEqGQFBOgnQIBGQkSoZAUE6CdAgEZCRKhkBQToJ0CARkJEqGQFBOgnQIBGQkSoZAUE6CdAgEZCRKhkBQToJ0CARkJEqGQFBOgnQIBGQkSoZAUE6CdAgEZCRKhkBQToJ0CARkJEqGQFBOgnQIBGQkSoZAUE6CdAgEZCRKhkBQToJ0CARkJEqGQFBOgnQIBGQkSoZAUE6CdFoHBHRdSyNT5CGfrIuFPR+yNE6CLoRAQEaiZAgE5SRIp3EgoPOmjONA5TGETtbjAIHU42tlVQKpbF09Hf8DWK0isNknn0MAAAAASUVORK5CYII=" width="100" height="100" />
								</div>
								<div className="menu-link-group">
									<div className="menu-link">
										<a ref='#/md-file-mode' className="btn btn-sm btn-default" onClick={ this.createProjectDocs.bind(this) }><i className="fa fa-plus"></i> Create Project documentation</a>
									</div>
									<div className="menu-link">
										<a ref='#/md-file-mode' className="btn btn-sm btn-default" onClick={ this.openProjectDocs.bind(this) }><i className="fa fa-folder-open-o"></i> Open Project documentation</a>
									</div>
									<div className="menu-link">
										<a className="btn btn-sm btn-default" onClick={ this.createMarkdownFile.bind(this) }><i className="fa fa-plus"></i> Create single markdown file</a>
									</div>
									<div className="menu-link">
										<a className="btn btn-sm btn-default" onClick={ this.openMarkdownFile.bind(this) }><i className="fa fa-folder-open-o"></i> Open single markdown file</a>
									</div>
								</div>
							</div>

							<div className="col-md-6 col-sm-6 menu-group">
								<div className="menu-group-icon">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACiklEQVR4Xu2cUU7DMBBE6TXhCJyHI9BrglD5QjRez+6sHOfx251x8l5MFBpxexn8fHzev0YzfB4n8P72ejuaPvzwJ4iQOOzIJEIilBpnENIIO7JUuZBRYeSgrjTz91f+iN/0PWRUeCXYkXNFSIRS4wxCGmFHlkJIhFLjDEIaYUeWQkiEUuMMQhphR5ZCSIRS4wxCGmFHlkJIhFLjDEIaYUeWQkiEUuMMQhphR5ZCSIRS4wxCGmFHlkJIhFLjDEIaYUeWWlbI2V+WUL+YQ0jkshVmECJAc0YQ4qQrdG8nRGCwRWTZe8gWdIWTQIgAzRlBiJOu0I0QAZozghAnXaEbIQI0ZwQhTrpCN0IEaM4IQpx0hW6ECNCcEYQ46QrdCBGgOSMIcdIVuhEiQHNGEOKkK3QjRIDmjCDESVfoRogAzRlBiJOu0I0QAZozghAnXaEbIQI0ZwQhTrpC97JCRu/2PnsRbZQTGEmR7V6UG4FFyOM6afv3TAh5AB/tNIQEf4GNQD6rWfYeEjzv7cYQsphShCBkMQKLHQ47BCGLEVjscNghCFmMwGKHs+wO4UmdJ/XSvbLdkzo7hB3CDiklsEnZsjf1TfhOnwZCppF5Awjx8p1uR8g0Mm8AIV6+0+0ImUbmDSDEy3e6fVkhPKnzpD59NR8F+FvWL53RziqlflCGEIT8f3nM3pS6rtizrDPLr+3NxbMArD5OhFQTTfYhJAmwOo6QaqLJPoQkAVbHEVJNNNmHkCTA6jhCqokm+xCSBFgdR0g10WQfQpIAq+MIqSaa7ENIEmB1HCHVRJN9CEkCrI4jpJposg8hSYDVcbuQ6gO+Wt/ou/npbwyvBrD6fBFSTTTZh5AkwOr4SMg3u+RwkqXzYc4AAAAASUVORK5CYII=" width="100" height="100" />
								</div>
								<div className="menu-link-group">
									<div className="menu-link">
										<a className="btn btn-sm btn-default" onClick={ this.createProjectComments.bind(this) }><i className="fa fa-plus"></i> Create line-by-line Project commentaries</a>
									</div>
									<div className="menu-link">
										<a className="btn btn-sm btn-default" onClick={ this.openProjectComments.bind(this) }><i className="fa fa-folder-open-o"></i> Open line-by-line Project commentaries</a>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 col-sm-6 col-xs-12">
								<h3 className="recent-title">Recent Project documentations</h3>
								<div className="panel-body">
									<div className="list-group recent-files">
										<a href="#" className="list-group-item">New Project (3)</a>
										<a href="#" className="list-group-item">DAX</a>
										<a href="#" className="list-group-item">Parquetrator 2.0</a>
										<a href="#" className="list-group-item">Google killer</a>
										<a href="#" className="list-group-item">To-do list</a>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-6 col-xs-12">
								<h3 className="recent-title">Recent Project commentaries</h3>
								<div className="panel-body">
									<div className="list-group recent-files">
										<a href="#" className="list-group-item">To-do list</a>
										<a href="#" className="list-group-item">Google killer</a>
										<a href="#" className="list-group-item">Parquetrator 2.0</a>
										<a href="#" className="list-group-item">DAX</a>
										<a href="#" className="list-group-item">New Project (3)</a>
									</div>
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
