import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { callResendVerificationApi } from "../../actions/auth/authActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";
import { Container, Button } from "@material-ui/core";
import { PageTitle, InputField, ButtonWrapper } from "../../styles/styles";

interface Props {
  userInformation: IAuthenticatedDetails;
  callResendVerificationApi: Function;
}

interface State {
  email: string;
}

export class Resend extends React.Component<
  Props & RouteComponentProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleInputChange = async event => {
    const newState = { [event.target.name]: event.target.value } as Pick<
      State,
      keyof State
    >;
    await this.setState(newState);
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.callResendVerificationApi(this.state.email);
  };

  public componentDidMount() {
    if (!isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/");
    }
  }

  componentWillMount = () => {
    this.props.userInformation.message = "";
  };

  public render() {
    const { userInformation } = this.props;

    return (
      <Container>
        <PageTitle>Resend Verification Token</PageTitle>

        <p>{userInformation.message}</p>

        <form id="resend_verify" onSubmit={this.handleSubmit}>
          <div>
            <InputField
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              required
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>

          <div>
            <ButtonWrapper>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                form="resend_verify"
              >
                Send
              </Button>
            </ButtonWrapper>
          </div>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userInformation: state.userInformation
});

const mapDispatchToProps = {
  callResendVerificationApi
};

export default connect(mapStateToProps, mapDispatchToProps)(Resend);
