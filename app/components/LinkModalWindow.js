import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button, Input } from 'react-bootstrap';
import * as modalWindowActions from '../actions/modalWindow'
import { renameItem } from '../actions/contextMenu.actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LinkModalWindow extends Component {

	static defaultProps = {
		initialValue: ''
	};

	constructor(props) {
		super(props);
		this.state = {
			initSelect: 0
		}
	}

	close() {
		this.props.hideModalWindow();
	}
	focus() {
		this.textInput.focus();

	}

	componentDidUpdate() {

		this.refs.my_input.refs.input.focus();
		if (this.state.initSelect == 0 && this.props.modalProperties.value) this.refs.my_input.refs.input.setSelectionRange(0, this.props.modalProperties.value.length);
	}


	addSomeLinkToText(e) {
		this.props.addLink(this.props.modalProperties.value, this.props.modalProperties.modalType);
		this.props.hideModalWindow();
		var textarea = document.getElementsByTagName('textarea')[0];
		setTimeout(function() {
			textarea.focus()
		}, 500);
	}

	handleChange(e) {
		this.setState({
			initSelect: 1
		});
		this.props.setValue(e.target.value);
	}

	render() {
		let opt = {
			title: "",
			placeholder: "",
			description: "",
			action: function() {
				console.log(this.state.value)
			},
			actionDef: ""
		}
		switch (this.props.modalProperties.modalType) {
			case "imageLink": {
				opt.title = "Image";
				opt.description = "Enter image URL address";
				opt.placeholder = "Some URL...";
				opt.action = this.addSomeLinkToText;
				opt.actionDef = "Add";
				break;
			}
			case "simpleLink": {
				opt.title = "Link";
				opt.description = "Enter URL address";
				opt.placeholder = "Some URL...";
				opt.action = this.addSomeLinkToText;
				opt.actionDef = "Add";
				break;
			}
			case "prompt": {
				opt.title = "Rename";
				opt.description = "Please enter new file name";
				opt.placeholder = "New name...";
				opt.action = this.props.renameItem;
				opt.actionDef = "Rename";
				break;
			}
		}
		return ( < div>
             < Modal show={ this.props.modalProperties.showModal } onHide={ this.close.bind(this) }>
               < Modal.Header closeButton>
                 < Modal.Title>
                   { opt.title }
                   </Modal.Title>
                   < / Modal.Header>
                     < Modal.Body>
                       < h4>
                         { opt.description }
                         </h4>
                         <Input type="text" value={ this.props.modalProperties.value } placeholder={ opt.placeholder } ref='my_input' groupClassName="group-class" labelClassName="label-class" onChange={ this.handleChange.bind(this) }
                         /> </ Modal.Body>
                       <Modal.Footer>
                         < Button onClick={ this.close.bind(this) }> Close
                           < /Button>
                             < Button bsStyle="primary" onClick={ opt.action.bind(this) }>
                               { opt.actionDef }
                               < /Button>
                                 < / Modal.Footer>
                                   < /Modal>
                                     < / div>
			);
	}
}

function mapStateToProps(state) {
	return {
		modalProperties: state.modalWindow
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, modalWindowActions, {
		renameItem: renameItem
	}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkModalWindow)
