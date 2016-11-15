import React, {
  Component
} from "react";

import './Modal.component.css';

import {
  bindActionCreators
} from 'redux';

import {
  connect
} from 'react-redux';

import * as modalWindowActions from "../actions/modalWindow.actions";

class ModalWindow extends Component {
  constructor() {
    super();
  }
  render() {
    return ({
      if (this.props.ModalWindow.isModal) < div id = "modal-wrap" > < div id = "modal-content" > {
        this.props.children
      } < /div></div >
    });
  }
}

function mapStateToProps(state) {
  return {
    ModalWindow: state.modalWindow
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(modalWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
