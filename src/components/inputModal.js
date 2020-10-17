//import ReactDOM from "react-dom";
import React, { Component } from "react";
import Modal from "react-modal";
import "../styles/modal.css";

export default class InputModal extends Component {
  constructor(props) {
    super(props);
    Modal.setAppElement("#root");

    this.state = {
      formLoadData: {
        formAddress: "",
        formMobile: "",
        formEmail: "",
        formExpiryDate: "",
        formStartDate: "",
        formEMI: "",
        formLoanName: "",
      },
      formError: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
  cleanLocalState = () => {
    this.setState({
      formLoadData: {
        formAddress: "",
        formMobile: "",
        formEmail: "",
        formExpiryDate: "",
        formStartDate: "",
        formEMI: "",
        formLoanName: "",
      },
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      formLoadData: { ...this.state.formLoadData, [name]: value },
    });
  }

  // Validation
  checkFieldsAreFilled() {
    let fd = this.state.formLoadData;
    if (
      fd.formAddress !== "" &&
      fd.formEmail !== "" &&
      fd.formExpiryDate !== "" &&
      fd.formStartDate !== "" &&
      fd.formEMI !== "" &&
      fd.formLoanName !== "" &&
      fd.formMobile !== ""
    )
      return true;
    else return false;
  }

  render() {
    return (
      <Modal
        isOpen={this.props.show}
        onRequestClose={() => {
          this.cleanLocalState();
          this.props.closeModal();
        }}
        style={this.customStyles}
        contentLabel="Create New Loan"
      >
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputLoanName">Loan Application Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLoanName"
                name="formLoanName"
                placeholder="Loan Name"
                value={this.state.formLoadData.formLoanName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEMI">EMI</label>
              <input
                type="number"
                className="form-control"
                id="inputEMI"
                name="formEMI"
                placeholder="EMI"
                value={this.state.formLoadData.formEMI}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputLoanStartDate">Loan Start Date</label>
              <input
                type="date"
                className="form-control"
                id="inputLoanStartDate"
                name="formStartDate"
                onChange={this.handleInputChange}
                value={this.state.formLoadData.formStartDate}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLoanExpiryDate">Loan Expiry Date</label>
              <input
                type="date"
                className="form-control"
                id="inputLoanExpiryDate"
                name="formExpiryDate"
                onChange={this.handleInputChange}
                value={this.state.formLoadData.formExpiryDate}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="formEmail"
                placeholder="test@taxblock.com"
                onChange={this.handleInputChange}
                value={this.state.formLoadData.formEmail}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputMobile">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                id="inputMobile"
                name="formMobile"
                placeholder="8086527804"
                onChange={this.handleInputChange}
                value={this.state.formLoadData.formMobile}
                required
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                name="formAddress"
                placeholder="1234 Main St"
                onChange={this.handleInputChange}
                value={this.state.formLoadData.formAddress}
                required
              />
            </div>
          </div>
          {this.state.formError && (
            <div className="alert alert-danger">{this.state.formError}</div>
          )}
        </form>
        <div className="form-row row">
          <div className="form-group col-sm-6">
            <button
              className="btn btn-primary col-sm-12"
              onClick={() => {
                this.cleanLocalState();
                this.props.closeModal();
              }}
            >
              Close
            </button>
          </div>
          <div className="form-group col-sm-6">
            <button
              className="btn btn-primary col-sm-12"
              onClick={() => {
                if (this.checkFieldsAreFilled()) {
                  this.props.saveFormLoanData(this.state.formLoadData);
                  this.cleanLocalState();
                } else {
                  let formError = "Some fields are empty";
                  this.setState({ formError: formError });
                }
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
