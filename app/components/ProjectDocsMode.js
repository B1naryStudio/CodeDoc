import React, { Component } from 'react';
import { Link } from 'react-router';
import './MDFileMode.module.css';
import Toolbar from '../components/Toolbar';
import FilesTree from '../components/FilesTree';
import ContentTree from '../components/ContentTree';
import WindowManager from '../components/WindowManager';
import MainWindow from '../components/MainWindow';
import ResultWindow from '../components/ResultWindow';
import CodeWindow from '../components/CodeWindow';
import SourceCodWindow from '../components/SourceCodWindow';
import SplitLayout from 'react-split-layout';
import LinkModalWindow from '../components/LinkModalWindow';
import Tab from '../components/Tab';
import { connect } from 'react-redux'


class MDFileMode extends Component {
	constructor(props) {
		super(props);
	}

	windowItems() {
		let result = [];
		if(this.props.windowManager.showCode && this.props.mainWindow.mainWindowCode !== 'no content'){
			result.push(<div className='code-window-container' key='0'>
							<CodeWindow />
						</div> );
		}
		result.push(<div className='main-window-container' key='1'>
 						<MainWindow />
					</div>);
		if(this.props.windowManager.showResult){
			result.push(<div className='res-window-container' key='2'>
 							<ResultWindow />
 						</div>);
		}
		return result;
	}

	render() {
		const windowItems = this.windowItems();
		return (
			<div className='md-mode-container'>
				<LinkModalWindow />
				<div className='toolbar-container btn-toolbar' role="toolbar">
					<Toolbar />
					<WindowManager />
				</div>
				<div className='panes-container'>
					<SplitLayout
						direction="vertical" initialSizes={[250, null, null]}
						minSizes={[100, 100, 100]}>
						<div className='sidebar-container'>
							<SplitLayout direction="horizontal" initialSizes={[null, null]} minSizes={[100, 100]}>
								<ContentTree />
								<FilesTree />
							</SplitLayout>
						</div>
						<div>
							<div className='tab-window-container'>
								<Tab />	
							</div>
							<div className='editor-window-container'>
								<SplitLayout direction="vertical">
									{windowItems}
								</SplitLayout>
							</div>
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
		windowManager: state.windowManager,
		mainWindow: state.mainWindow
	}
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators(mainWindowActions, dispatch)
// }

export default connect(mapStateToProps)(MDFileMode)