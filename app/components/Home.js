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

	createProject(evt) {
		this.props.createProject(true);
	}

	openProject(evt) {
		this.props.openProject(true);
	}

	createMarkdownFile(evt){
		this.props.createMarkdownFile(true);
	}

	render() {
		return (
			<div className="homeBody">
				<div className="container">
				<h2 className="codeDocLogo">&lt;/&gt; CodeDoc</h2>
					<div>
						<div className="row">
							
							<div className="col-md-3 col-sm-6 col-xs-6">
								<a ref='#/md-file-mode' data-toggle="tooltip" title="Create new markdown file" onClick={ this.createMarkdownFile.bind(this) } className="btn btn-default btn-lg">
									<img src="data:image/png;base64,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" width="100" height="100" />
								</a>
							</div>

							<div className="col-md-3 col-sm-6 col-xs-6">
								<a ref='#/md-file-mode' data-toggle="tooltip" title="Open markdown file" onClick={ this.openMarkdownFile.bind(this) } className="btn btn-default btn-lg">
									<img src="data:image/png;base64,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" width="100" height="100" />
								</a>
							</div>

							<div className="col-md-3 col-sm-6 col-xs-6">
								<a onClick={ this.createProject.bind(this) } className="btn btn-default btn-lg">
									<img data-toggle="tooltip" title="Create new project documentation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAF3klEQVR4Xu2dUXLbNhCGdzkTT6WXqCeofILGJ4h8gtiPFt2p/NjKmconiHqCyNPoOcq0dB8rn8DuCeqcIMoJYr84GWqG24FFuiQNmlhSYMRyOaMXa4kF/w/YBUBARpBroxTAjaqNVAYEyIY1AgFSdyBT74w27Bk2ujpDt89q9Cxj9eQChMdfgPD0sm4tQKxLzHNQORCuQ97j1M86HdK5+pTOIVyH9ZOYV2MBwtPLurUAsS4xz4EA4ell3VqAWJeY50CA8PSybi1ArEvMcyBAeHpZtxYg1iXmORAgPL2sWwsQ6xLzHAgQnl7WrQWIdYl5DgQITy/r1gLEusQ8BwKEp5d1awFiXWKeAwHC08u6tQCxLjHPQW2A5G0fynoVnHcfT67i1qavqgVIcY1ZdwqQUC7pITntpmiXzBNWQtZKeNkGxApc+cZFG2xUsgDJ15hlIUBYctk3FiD2NWZ5ECAsuewbCxD7GrM8CBCWXPaNBYh9jVkeagNEJoZmXCubhwgQAWKmgKGVLC7K4qJZUymbtMy81NeqrD6V5ZD6SsyruQDh6WXdWoBYl5jnQIDw9LJuLUCsS8xzIEB4elm3FiDWJeY5qA0QWToxA1vZPESACBAzBQytZC1L1rLMmkrZpGXmpb5WZfWpLIfUV2JezQUITy/r1gLEusQ8BwKEp1dh66nnPQOA5wDYI4IOInQB7j53FxFcItICAAdxJ6ajs+geySGPIHr99q/O1tbtjwA4iovPoer7rW9PjvavTe8RIBqlFIgnTz6/AqABInZMxdTZEdE1ojPx/W9OTcAIkJSKv/3+Z89x6G3RHpEFT4EhcvZf/nBw+RjgyoDUfekkzBTnADAPAmfhOMH10HWv1N9VfgkCp+M4gcopewD4IhsMTI4P+ydZ3wuQnHhEQB8RYOz77blJyFHFhblnjwDGCPjdQxc0G7rukc61AMkGcgNAE99vT0xBpIsKwYzCQcHT5Pd6KAJED0TB6EUhqUxSj0IaAKrckYby69B1x/HyKwNS9qFs3B8m8It42UTwfrls9Yr2iqx6hiO3S0T4PgEAYf/nfn/e+HnIKpx8/ic1mrrx/VZ33TAisUOfi3hPUaOv5bK9HflsbA+Zet4YAF/FWisrTBVdIlnN+NPhi+5DVyOBrMLH7YfkpO8/UUzCY1EgYU5JNwZwHNz+6eBg0Uggb/44GyHC60h4NbRd+u1nnFBVBshdg9i6vYoPiYng5PiwP2kkkKl39iGZO+ho6Lozk54R2ZQBEvaSAQCqFYHoWgzd/nbjgIQxXCXz+4u7ALgSNPnf6rirumGC/5Sam+w0Dkg6XAHQ+dB19zi9Yx1Awl4yjy+zqLDVOCBTz0uIAMAPV2sEkgpbdN5AIGdqxvw86hFBgLt5K7C63lM2ZKkyNRPTv5sIJJ3Qd3RLJHmr09wQp8sxmnzWvGGvacuuAogu9DWxhyT+l29VP5xm6qdxQN543iL5joI2KWQ17xflpt7mJnW10ty4HiLDXu5wxLK9TAwtC8wtXpZOuIpVYK9J7F99cVGtOB+7brdxOUTxfhi2YOH7rZ1Kl98z3sc0EojuVSqAvKCqIDhlu0i/wl1t+YRd050mpjP+dA1UDiOCi9QW1dOh21f7h5s3D4kE0r+1S244WHeL0b86hsTGikaGrEho3TYgALry/fYuJ5+YgAs3zV0AoDrWcH/hurcBmVSmbjbc8JX3fBlhSt12H6qiMkr3kLzK1PV77jEC3XOuesWXX4iCUfpYAxG8Oz7sJw73rCWH1FVwRr0XRDBeLlvnpmEs3KX4Qu0N1p0vUTCWy9ZIV570EAYZdRSBCOaOAwsiuokfR0DEp0EAXUR1HOHuk3U9CFOJnMKrz//fWiV6dIKZ/hhBqee/QYRBfB+vrjR2DylVpZrcHE4c1a50FeNTO9YLPcSp77fGJiFPgDyib5gLBoA04vaY8KDPzHGcmdoiaopRgBgqtRq6Yg+RegDYIaBuaivoe3UsmgjV8ehL0xl/2v2/klAbMvuTDhUAAAAASUVORK5CYII=" width="100" height="100" />
								</a>
							</div>

							<div className="col-md-3 col-sm-6 col-xs-6">
								<a onClick={ this.openProject.bind(this) } className="btn btn-default btn-lg">
									<img data-toggle="tooltip" title="Open project documentation" src="data:image/png;base64,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" width="100" height="100" />
								</a>
							</div>

						</div>
						<div className="row">
							<div className="col-md-6 col-sm-6 col-xs-12">
								<h3 className="recent-title">Recent markdowns</h3>
								<div className="panel-body">
									<div className="list-group recent-files">
										<a href="#" className="list-group-item">File1.md</a>
										<a href="#" className="list-group-item">File2.md</a>
										<a href="#" className="list-group-item">Документ1.md</a>
										<a href="#" className="list-group-item">File3.md</a>
										<a href="#" className="list-group-item">asdadwawd.md</a>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-6 col-xs-12">
								<h3 className="recent-title">Recent Projects</h3>
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
