import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
// import { callRegisterApi } from "../../actions/auth/authActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";

interface Props {
  userInformation: IAuthenticatedDetails;
//   callRegisterApi: Function
}

interface State {
//   verificationToken: string 
}

export class Verify extends React.Component<
  Props & RouteComponentProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
    
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount() {
  }

  public render() {
    // const { userInformation } = this.props;

    return (
        <h1>hi</h1>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
//   userInformation: state.userInformation
});

const mapDispatchToProps = {
//   callRegisterApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify);
