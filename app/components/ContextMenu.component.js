import React, {Component} from 'react';
import { Link } from 'react-router';
import * as contextMenuActions from '../actions/contextMenu.actions'
import './ContextMenu.component.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import list from '../utils/contextMenu.list'



class ContextMenu extends Component {
    constructor(){
        super();
    }

    clickHandler(){
        console.log('CLICKED')
    }

    render(){
           let context = list.map((elem, index)=><li onClick={this.clickHandler.bind(this)} className='context-menu-item' key={index}>{elem}</li>);
            {
                //console.log(this.props.ContextMenuState);
                if(this.props.ContextMenuState.isVisible)
                    return <ul id='context-menu' style={{top:this.props.ContextMenuState.y-10, left: this.props.ContextMenuState.x}} className='contextMenu'>{context}</ul>
                else{
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
	return bindActionCreators(contextMenuActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu)

