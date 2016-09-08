import React, { Component } from 'react';
import { Link } from 'react-router';
import './MDFileMode.module.css';
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import MainWindow from '../components/MainWindow';
import ResultWindow from '../components/ResultWindow';
import SourceCodWindow from '../components/SourceCodWindow';
import SplitLayout from 'react-split-layout';
import Markdown from'react-remarkable';
import LinkModalWindow from '../components/LinkModalWindow';
import Tab from '../components/Tab';


export default class MDFileMode extends Component {
	render() {
		return (
			<div className='md-mode-container'>
				<LinkModalWindow />
				<div className='toolbar-container'>
					<Toolbar />
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
							<div>
								<SplitLayout direction="vertical" initialSizes={[null, null]}
									minSizes={[100, 100]}>
									
									<div className='main-window-container'>
										<MainWindow />
									</div>
									<div className='res-window-container'>
											<ResultWindow />
									</div>
								</SplitLayout>
							</div>
						</div>
					</SplitLayout>
				</div>
			</div>
		);
	}
}