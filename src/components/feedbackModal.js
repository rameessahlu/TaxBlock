//import ReactDOM from "react-dom";
import React, { Component } from "react";
import Modal from "react-modal";
import "../styles/modal.css";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    Modal.setAppElement("#root");
  }

  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      alignItems: "center",
    },
  };

  render() {
    return (
      <Modal
        isOpen={this.props.show}
        onRequestClose={this.props.closeModal}
        style={this.customStyles}
        contentLabel="Sign Up"
      >
        <h2>Registration Successful!</h2>
        <div className="modal-button">
          <button className="btn btn-primary " onClick={this.props.closeModal}>
            close
          </button>
        </div>
      </Modal>
    );
  }
}
