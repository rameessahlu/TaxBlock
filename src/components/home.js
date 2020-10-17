import React, { Component } from "react";
import { connect } from "react-redux";

// Store
import configureStore from "../store/configureStore";
import { loanAdded, selectLoans } from "../store/loans";

// Components
import InputModal from "./inputModal";

const store = configureStore();

class Home extends Component {
  constructor(props) {
    super(props);
    let isUserLoggedIn = this.props.userLoggedIn;
    if (typeof isUserLoggedIn === "undefined" || isUserLoggedIn === "")
      this.props.history.push("/login");

    this.state = {
      showModal: false,
    };
  }

  showFormModal = () => {
    this.setState({ formError: "", showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  addLoan = (formData) => {
    console.log("adding loan", formData);
    store.dispatch(
      loanAdded(
        formData.formLoanName,
        formData.formAddress,
        formData.formEmail,
        formData.formStartDate,
        formData.formExpiryDate,
        formData.formMobile,
        formData.formEMI,
        this.props.userLoggedIn
      )
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-10">
            <h2>
              Loan <b>Details</b>
            </h2>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-info add-new"
              onClick={this.showFormModal}
            >
              <i className="fa fa-plus"></i> Add New
            </button>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">LOAN APPLICATION NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">MOBILE NUMBER</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">LOAN START DATE</th>
              <th scope="col">LOAN EXPIRY DATE</th>
              <th scope="col">MONTHLY INSTALLMENT</th>
            </tr>
          </thead>
          <tbody>
            {this.props.loans.map((loan) => {
              return (
                <tr key={loan.name}>
                  <th scope="row">1</th>
                  <td>{loan.name}</td>
                  <td>{loan.email}</td>
                  <td>{loan.mobile}</td>
                  <td>{loan.address}</td>
                  <td>{loan.startData}</td>
                  <td>{loan.expDate}</td>
                  <td>{loan.emi}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <InputModal
          show={this.state.showModal}
          closeModal={this.closeModal}
          saveFormLoanData={this.addLoan}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.auth.email_address,
    loans: selectLoans(state, state.auth.email_address),
  };
}

export default connect(mapStateToProps)(Home);
