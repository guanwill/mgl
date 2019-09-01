import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { callLoginApi } from "../../actions/auth/loginActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

interface Props {
  userInformation: IAuthenticatedDetails;
  callLoginApi: Function;
}

interface State {
  username: string;
  password: string;
}

export class Login extends React.Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event: { target: { name: any; value: any } }) {
    const newState = { [event.target.name]: event.target.value } as Pick<
      State,
      keyof State
    >;
    this.setState(newState);
    console.log("On Change! ", this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.callLoginApi(this.state.username, this.state.password);
  }

  componentDidUpdate = prevProps => {
    if (this.props.userInformation.user.verified) {
      console.log("verified", this.props.userInformation.user.verified);
      this.props.history.push("/");
    } else if (this.props.userInformation.user.verified === prevProps) {
      this.props.history.push("/login");
    }
  };

  componentDidMount = () => {
    if (!isTokenExpired()) {
      console.log('IS EXPIRED? LOGIN.TX ', isTokenExpired());
      // user will never get jwt and verified status if they are in pending verification status
      this.props.history.push("/");
    }
  };

  public render() {
    const { userInformation } = this.props;
    return (
      <>
        <h1>Login</h1>

        {console.log("user info: ", userInformation)}
        <p>{userInformation.user.username}</p>
        <p>{userInformation.message}</p>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                name="username"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login User
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userInformation: state.userInformation
});

const mapDispatchToProps = {
  callLoginApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
