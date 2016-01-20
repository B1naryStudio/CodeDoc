import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button, Input } from 'react-bootstrap';
import * as modalWindowActions from '../actions/modalWindow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


export default class LinkModalWindow extends Component {

	static defaultProps = {initialValue: ''};

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}
	
	close(){
		this.props.hideModalWindow();
	}

	addSomeLinkToText(e){
		this.props.addLink(this.state.value, this.props.modalProperties.modalType);
		this.setState({
			value: ''
		})
		this.props.hideModalWindow();
	}

	handleChange(e){
		this.setState({
			value: e.target.value
		})
	}
	
	render() {
		return (
			<div>
				<Modal show={this.props.modalProperties.showModal} onHide={this.close.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
						<Modal.Body>
							<h4>Enter a URL address</h4>
							<Input
							type="text"
							value={this.state.value}
							placeholder="some url..."
							ref="input"
							groupClassName="group-class"
							labelClassName="label-class"
							onChange={this.handleChange.bind(this)} />
						</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close.bind(this)}>Close</Button>
						<Button bsStyle="primary" onClick={this.addSomeLinkToText.bind(this)}>Add Link</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		modalProperties: state.modalWindow
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(modalWindowActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkModalWindow)
