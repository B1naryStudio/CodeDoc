import React, {Component} from 'react';
import { Link } from 'react-router';
import * as mainWindowActions from '../actions/mainWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../utils/contextMenu.list'



class ContextMenu extends Component {
    constructor(){
        super();
        this.state = {
            file: new List().list[0]
        }
    }
    render(){
        console.log(new List().list);
        return (<div>ContextMenu + {this.state.file}</div>)
    }
}

function mapStateToProps(state) {
	return {
		ContextMenuState: state.contextMenu,
		mainWindow: state.mainWindow
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(mainWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu)

