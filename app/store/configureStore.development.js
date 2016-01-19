import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import ActionsMapping from '../menu/actionsMapping';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router';

const reduxRouterMiddleware = syncHistory(hashHistory);

const createStoreWithMiddleware = compose(
	applyMiddleware(thunk, reduxRouterMiddleware),
	DevTools.instrument()
)(createStore);


export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);
	reduxRouterMiddleware.listenForReplays(store);
	
	ActionsMapping(store);

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers'))
		);
	}

	return store;
}
