import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { callLoginApi } from "../../actions/auth/authActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

// Materialui
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { InputField, PageTitle, ButtonWrapper } from "../../styles/styles";

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
  }

  handleInputChange = (event: { target: { name: any; value: any } }) => {
    const newState = { [event.target.name]: event.target.value } as Pick<
      State,
      keyof State
    >;
    this.setState(newState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.callLoginApi(this.state.username, this.state.password);
  }

  componentDidUpdate = prevProps => {
    if (this.props.userInformation.user.verified) {
      console.log("verified", this.props.userInformation.user.verified);
      this.props.history.push(
        `/user/${this.props.userInformation.user._id}/games`
      );
    } else if (this.props.userInformation.user.verified === prevProps) {
      this.props.history.push("/login");
    }
  };

  componentDidMount = () => {
    if (!isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      // user will never get jwt and verified status if they are in pending verification status
      this.props.history.push("/");
    }
  };

  componentWillMount = () => {
    this.props.userInformation.message = "";
  };

  public render() {
    const { userInformation } = this.props;
    return (
      <Container>
        <PageTitle>Login</PageTitle>

        {console.log("user info: ", userInformation)}
        <p>{userInformation.user.username}</p>
        <p>{userInformation.message}</p>

        <div>
          <form id="login" onSubmit={this.handleSubmit}>
            <div>
              <InputField
                type="email"
                placeholder="Email"
                className="form-control"
                name="username"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
            </div>
            <div>
              <InputField
                type="password"
                placeholder="Password"
                className="form-control"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </div>
            <div>
              <ButtonWrapper>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  form="login"
                >
                  Login
                </Button>
              </ButtonWrapper>
            </div>
          </form>
        </div>
      </Container>
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
