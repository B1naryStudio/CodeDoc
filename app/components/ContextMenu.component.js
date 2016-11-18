import React, { Component } from 'react';
import { Link } from 'react-router';
import * as contextMenuActions from '../actions/contextMenu.actions'
import * as projectWindowActions from '../actions/projectWindow'
import { showModalWindow } from '../actions/mainWindow';
import './ContextMenu.component.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import list from '../utils/contextMenu.list'



class ContextMenu extends Component {
  constructor() {
    super();
    this.disableAction = this.disableAction.bind(this);
  }

  clickHandler(elem) {
    switch (elem.action) {
      case "CREATE_MD_FILE_IN_FOLDER": {
        this.props.createFile(this.props.ContextMenuState.target);
        break;
      }
      case "DELETE_MD_FILE_IN_FOLDER": {
        this.props.deleteContentItem("TREE");
        break;
      }
      case "DELETE_CONTENT_ITEM": {
        this.props.deleteContentItem();
        break;
      }
      case "RENAME_CONTENT_ITEM": {
        let path = this.props.ContextMenuState.target.docsPath;
        let file = path.substring(path.lastIndexOf("/") + 1, path.length);
        this.props.showModalWindow("prompt", file);
        break;
      }
    }
  }

  closeByEsc(evt) {
    console.log(evt.keyCode);
  }

  disableAction(el) {
    let createMD = (this.props.ContextMenuState.target.hasDocs && el.action == "CREATE_MD_FILE_IN_FOLDER");
    let createCom = (this.props.ContextMenuState.target.hasCom && el.action == "CREATE_COMMENT_FILE_IN_FOLDER");
    let deleteCom = (!this.props.ContextMenuState.target.hasCom && el.action == "DELETE_COMMENT_FILE_IN_FOLDER");
    let deleteMD = (!this.props.ContextMenuState.target.hasDocs && el.action == "DELETE_MD_FILE_IN_FOLDER");
    return (createMD || createCom || deleteCom || deleteMD);
  }

  render() {
    let filteredArray = list.filter((elem, index) => elem.target == this.props.ContextMenuState.target.type);
    let context = filteredArray.map((elem, index) => < li className={ 'context-menu-item' + (this.disableAction(elem) ? " disabled-action" : "") } onClick={ this.disableAction(elem) ? undefined : this.clickHandler.bind(this, elem) } onKeyPress={ this.closeByEsc.bind(this) } key={ index }>
                                                       { elem.title }
                                                       < /li>);
    {
      if (this.props.ContextMenuState.isVisible)
        return <ul id='context-menu' style={ { top: this.props.ContextMenuState.y - 10, left: this.props.ContextMenuState.x } } className='contextMenu'>
                 { context }
                 < /ul>
      else {
        return null
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    ContextMenuState: state.contextMenu
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, contextMenuActions, projectWindowActions, {
    showModalWindow
  }), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
