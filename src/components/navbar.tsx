import React from "react";
import { connect } from "react-redux";
import { AppState, initialState } from "../store";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../helpers/isTokenExpired";
import { IAuthenticatedDetails } from "../model/auth/auth";
import { logoutUser } from "../actions/auth/authActions";

interface Props {
  userInformation: IAuthenticatedDetails;
  logoutUser: Function;
}
interface State {}

export class Navbar extends React.Component<
  Props & RouteComponentProps,
  State
> {
  onLogout = async e => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    await this.props.logoutUser(initialState.userInformation);
    this.props.history.push("/login");
  };

  public render() {
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
          Logout
        </a>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Sign In
          </Link>
        </li>
      </ul>
    );
    return (
      <>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isTokenExpired() ? guestLinks : authLinks}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userInformation: state.userInformation
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
