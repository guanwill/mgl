import React from "react";
import { connect } from "react-redux";
import { AppState, initialState } from "../store";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../helpers/isTokenExpired";
import { IAuthenticatedDetails } from "../model/auth/auth";
import { logoutUser } from "../actions/auth/authActions";

// MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { NavBrandWrapper, NavButtonWrapper } from "../styles/styles";
import Grid from "@material-ui/core/Grid";

interface Props {
  userInformation: IAuthenticatedDetails;
  logoutUser: Function;
}
interface State {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  authButton: {
    boxShadow: "none",
    height: "max-content",
    width: "100px",
    margin: "5px",
    "&:hover": {
      boxShadow: "none"
    }    
  },
  appbar: {
    borderBottom: "2px dotted lightgrey",
    boxShadow: "none",
    background: 'white',
    color: '#3f51b5',
  },
  toolbar: {
    margin: '7px'
  }
}));

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
    const NavBar = () => {
      const classes = useStyles({});
      return (
        <div className={classes.root}>
          <AppBar className={classes.appbar} position="static">
            <Toolbar className={classes.toolbar}>
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <NavBrandWrapper>A HERO'S BAG</NavBrandWrapper>
                </Grid>
                <Grid item md={6} xs={12}>
                  <NavButtonWrapper>
                    {isTokenExpired()
                      ? guestLinks(classes)
                      : authLinks(classes)}
                  </NavButtonWrapper>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      );
    };

    const authLinks = classes => {
      return (
        <Button
          className={classes.authButton}
          onClick={this.onLogout.bind(this)}
          variant="outlined"
          color="primary"
        >
          Logout
        </Button>
      );
    };

    const guestLinks = classes => {
      return (
        <>
          <Button
            className={classes.authButton}
            component={Link}
            to={`/register`}
            variant="outlined"
            color="primary"
          >
            Register
          </Button>

          <Button
            className={classes.authButton}
            component={Link}
            to={`/login`}
            variant="outlined"
            color="primary"
          >
            Login
          </Button>

          {/* <Link className="nav-link" to="/register">
            <Button color="inherit">Register</Button>
          </Link>
          <Link className="nav-link" to="/login">
            Sign In
          </Link> */}
        </>
      );
    };

    return (
      <>
        <NavBar />
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
