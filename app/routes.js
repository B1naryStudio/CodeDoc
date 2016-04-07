import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import MDFileModePage from './containers/MDFileModePage';
import ProjectCommentsModePage from './containers/ProjectCommentsModePage';
import ProjectDocsModePage from './containers/ProjectDocsModePage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="counter" component={CounterPage} />
		<Route path="md-file-mode" component={MDFileModePage} />
		<Route path="project-comments-mode" component={ProjectCommentsModePage} />
		<Route path="project-docs-mode" component={ProjectDocsModePage} />
	</Route>
);
