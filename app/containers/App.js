import React, { Component, PropTypes } from 'react';
import ContextMenu from '../components/ContextMenu.component'
import * as contextMenuActions from '../actions/contextMenu.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
export class App extends Component {
  constructor(){
    super();
    this.manageContextMenu = this.manageContextMenu.bind(this);
    console.log(contextMenuActions)
  }
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  manageContextMenu(evt){
    if(this.props.ContextMenuState.isVisible){
      this.props.hideContext();
    }
  };
  render() {
    return (
      <div id='app-wrap' onClick={this.manageContextMenu}>
        <ContextMenu />
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		ContextMenuState: state.contextMenu
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(contextMenuActions, dispatch)
}

 export default connect(mapStateToProps, mapDispatchToProps)(App)

