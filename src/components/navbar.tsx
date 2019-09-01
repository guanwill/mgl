import React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../helpers/isTokenExpired";

interface Props {}
interface State {}

export class Navbar extends React.Component<
  Props & RouteComponentProps,
  State
> {
//   componentDidMount = () => {
//     if (!isTokenExpired()) {
//         console.log('navbar check token');
//       this.props.history.push("/");
//     }
//   };


  onLogout(e) {
    e.preventDefault();
    console.log("IN HEREEEE");
    localStorage.removeItem("accessToken");
    this.props.history.push("/login");
  }

  public render() {
      {console.log('IS TOKEN EXPIRED? ', isTokenExpired());}
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

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Navbar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
