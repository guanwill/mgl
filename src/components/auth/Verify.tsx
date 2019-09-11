import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { callVerifyApi } from "../../actions/auth/authActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import isTokenExpired from "../../helpers/isTokenExpired";

interface Props {
  userInformation: IAuthenticatedDetails;
  callVerifyApi: Function;
}

interface State {
  verified: boolean;
}

interface RouteParams {
  id: string;
}

export class Verify extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      verified: false
    };
  }

  componentDidMount = async () => {
    await this.props.callVerifyApi(this.props.match.params.id);

    if (!isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/");
    }

    if (this.props.userInformation.message === 'Account verified.') {
      this.setState({verified: true});
    }
  };

  componentWillMount = () => {
    this.props.userInformation.message = "";
  };

  public render() {
    return (
      <>
        {this.state.verified ? (
          <p>{this.props.userInformation.message}</p>
        ) : (
          <div>
            <p>{this.props.userInformation.message}</p>
            <Link className="nav-link" to="/resend">
              Resend Verification Link
            </Link>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userInformation: state.userInformation
});

const mapDispatchToProps = {
  callVerifyApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify);
