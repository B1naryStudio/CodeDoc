import React, { Component } from 'react';
import { Link } from 'react-router';
import './MDFileMode.module.css';
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import WindowManager from '../components/WindowManager';
import MainWindow from '../components/MainWindow';
import ResultWindow from '../components/ResultWindow';
import ContentWindow from '../components/ContentWindow';
import SourceCodWindow from '../components/SourceCodWindow';
import SplitLayout from 'react-split-layout';
import Markdown from'react-remarkable';
import LinkModalWindow from '../components/LinkModalWindow';
import Tab from '../components/Tab';
import { connect } from 'react-redux'


class MDFileMode extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='md-mode-container'>
				<LinkModalWindow />
				<div className='toolbar-container btn-toolbar'>
					<Toolbar />
					<WindowManager />
				</div>
				<div className='panes-container'>
					<SplitLayout
						direction="vertical" initialSizes={[250, null, null]}
						minSizes={[100, 100, 100]}>
						<div className='sidebar-container'>
							<Sidebar />							
						</div>
						<div>
							<div className='tab-window-container'>
 								<Tab />	
 							</div>
							{this.props.windowManager.showContent &&
								<div>
									<SplitLayout direction="vertical" initialSizes={[null, null, null]} minSizes={[100, 100, 100]}>
										<div className="content-window-container">
											<ContentWindow />
										</div>
										<div className='main-window-container'>
											<MainWindow />
										</div>
										<div className='res-window-container'>
											<ResultWindow />
										</div>
									</SplitLayout>
								</div>}
							{!this.props.windowManager.showContent &&<div>
									<SplitLayout direction="vertical" initialSizes={[null, null]} minSizes={[100, 100]}>
										<div className='main-window-container'>
											<MainWindow />
										</div>
										<div className='res-window-container'>
											<ResultWindow />
										</div>
									</SplitLayout>
								</div>
							}
						</div>
					</SplitLayout>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		//toolbarState: state.toolbar,
		windowManager: state.windowManager
	}
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators(mainWindowActions, dispatch)
// }

export default connect(mapStateToProps)(MDFileMode)