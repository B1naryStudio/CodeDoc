import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router';
import './MDFileMode.module.css';
import Toolbar from '../components/Toolbar';
import MainWindow from '../components/MainWindow';
import ResultWindow from '../components/ResultWindow';
import SourceCodWindow from '../components/SourceCodWindow';
import SplitLayout from 'react-split-layout';
import Markdown from 'react-remarkable';
import LinkModalWindow from '../components/LinkModalWindow';
import * as showContextActions from '../actions/contextMenu.actions'
import ContextMenu from "../components/ContextMenu.component"
import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'

export class MDFileMode extends Component {
  constructor(props) {
    super(props);
    this.contextMenu = this.contextMenu.bind(this);
  }
  contextMenu(type, evt) {
    this.props.showContext(type, evt.clientX, evt.clientY);
  }
  render() {
    return ( <
        div className = 'md-mode-container' >
        <
        LinkModalWindow / >
        <
        div className = 'toolbar-container'
        onContextMenu = {
          this.contextMenu.bind(this, 'general')
        } >
        <
        Toolbar / >
        <
        div / >
        <
        /div> <div className = 'panes-container' onContextMenu = {
        this.contextMenu.bind(this, 'file-in-tree')
      } >
      <
      SplitLayout direction = "vertical"
    minSizes = {
        [100, 100]
      } >
      <
      div className = 'main-window-container' >
      <
      MainWindow / >
      <
      /div> <
    div className = 'res-window-container' >
      <
      ResultWindow / >
      <
      /div> < /
    SplitLayout > <
      /div> < /
    div >
  );
}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(showContextActions, dispatch)
}

export default connect(null, mapDispatchToProps)(MDFileMode)
