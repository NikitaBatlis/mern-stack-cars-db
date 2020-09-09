import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';

export default class EditModal extends React.Component {
    
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <ModalHeader className="modalContainer" closeButton>
                    <Modal.Title>Edit Car Details</Modal.Title>
                </ModalHeader>
                <Modal.Body className="modalContainer">
                    <form onSubmit={this.props.submitEdit}> 
                        <input type="text" name="owner" placeholder="New Owner.."></input>
                        <button>Save</button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}
