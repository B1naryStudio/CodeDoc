import React, { Component, PropTypes } from 'react';
import ContextMenu from '../components/ContextMenu.component'
import * as contextMenuActions from '../actions/contextMenu.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
export class App extends Component {
  constructor(){
    super();
    this.manageContextMenu = this.manageContextMenu.bind(this);
    this.addListenetrs.call(this);
  }
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  addListenetrs(){
    console.log(this.ContextMenuState);
     document.addEventListener('keydown', (evt)=>{
       if(this.props.ContextMenuState.isVisible==true && evt.keyCode==27){
         this.props.hideContext();
       }
     })
  }
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
            //if (process.env.NODE_ENV !== 'develop') {
            if (false) {
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

