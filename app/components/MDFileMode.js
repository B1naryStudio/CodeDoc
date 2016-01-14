import React, { Component } from 'react';
import { Link } from 'react-router';
import './MDFileMode.module.css';
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import MainWindow from '../components/MainWindow';
import ResultWindow from '../components/ResultWindow';
import SourceCodWindow from '../components/SourceCodWindow';


export default class MDFileMode extends Component {
	render() {
		return (
			<div>
				<div className='md-mode-container'>
					<div className='toolbar-container'>
						<Toolbar />
						<Sidebar />
						<MainWindow />
						<ResultWindow />
						<SourceCodWindow />
					</div>
				</div>
			</div>
		);
	}
}