import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { callRegisterApi } from "../../actions/auth/authActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

interface Props {
  userInformation: IAuthenticatedDetails;
  callRegisterApi: Function
}

interface State {
  username: string;
  password: string;
  password_confirm: string;
  password_validation: string;
  submit_disabled: boolean;  
}

export class Register extends React.Component<
  Props & RouteComponentProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_confirm: "",
      password_validation: "",
      submit_disabled: true,      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = async (event) => {
    const newState = { [event.target.name]: event.target.value } as Pick<State, keyof State>;
    await this.setState(newState);
  }

  handlePasswordChange = async (event) => {
    const newState = { [event.target.name]: event.target.value } as Pick<State, keyof State>;
    await this.setState(newState);
    this.validateFields();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.callRegisterApi(this.state.username, this.state.password);
    if (this.props.userInformation.user._id && this.props.userInformation.user._id.length) {
      this.props.history.push('/login')
    } else {
      this.props.history.push('/register')
    }
  }

  validateFields = () => {
    if (this.state.password.length && this.state.password_confirm.length && this.state.password === this.state.password_confirm) {
      this.setState({
        submit_disabled: false,
        password_validation: ""
      })
    } else {
      this.setState({
        submit_disabled: true,
        password_validation: "Password mismatch"
      })
    }
  }

  public componentDidMount() {
    if (!isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/");
    }
  }

  componentWillMount = () => {
    this.props.userInformation.message = ''
  };

  public render() {
    const { userInformation } = this.props;

    return (
      <div className="container">
        <h2 style={{ marginBottom: "40px" }}>Registration</h2>

        <p>{userInformation.message}</p>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group"></div>
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
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              name="password_confirm"
              onChange={this.handlePasswordChange}
              value={this.state.password_confirm}
            />
            <p>{this.state.password_validation}</p>
          </div>
          <div className="form-group">
            <button disabled={this.state.submit_disabled} type="submit" className="btn btn-primary">
              Register User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userInformation: state.userInformation
});

const mapDispatchToProps = {
  callRegisterApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
