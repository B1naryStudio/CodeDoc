import React, { Component } from 'react';
import { Link } from 'react-router';
import './MDFileMode.module.css';
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import MainWindow from '../components/MainWindow';
import ResultWindow from '../components/ResultWindow';
import SourceCodWindow from '../components/SourceCodWindow';
import SplitPane from 'react-split-pane';


export default class MDFileMode extends Component {
	render() {
		return (
			<div className='md-mode-container'>
				<div className='toolbar-container'>
					<Toolbar />
				</div>

				<SplitPane split="vertical" defaultSize="200">
					<div className='sidebar-container'>
						<Sidebar />
					</div>

					<SplitPane split="vertical">
						<div className='main-window-container'>
							<MainWindow />
						</div>
						<div className='res-window-container'>
								<ResultWindow />
							</div>
					</SplitPane>
				</SplitPane>
			</div>
		);
	}
}