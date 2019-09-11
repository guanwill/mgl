import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { callResendVerificationApi } from "../../actions/auth/authActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

interface Props {
  userInformation: IAuthenticatedDetails;
  callResendVerificationApi: Function
}

interface State {
  email: string
}

export class Resend extends React.Component<
  Props & RouteComponentProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = async (event) => {
      console.log('inputchange' , event.target);
    const newState = { [event.target.name]: event.target.value } as Pick<State, keyof State>;
    await this.setState(newState);
    console.log('new state' , this.state.email);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.callResendVerificationApi(this.state.email);
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
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Resend Verification Token</h2>

        <p>{userInformation.message}</p>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Send verification token
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
  callResendVerificationApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resend);
