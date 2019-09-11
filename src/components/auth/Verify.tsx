import React from "react";
import { connect } from "react-redux";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { callVerifyApi } from "../../actions/auth/authActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";

interface Props {
  userInformation: IAuthenticatedDetails;
  callVerifyApi: Function
}

interface State {
    verified: boolean;
}

interface RouteParams {
    id: string
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

  componentDidMount() {
        this.props.callVerifyApi(this.props.match.params.id)

        if (this.props.userInformation.user._id && this.props.userInformation.user._id.length) {
            this.setState({
                verified: true
            })
        }            
        
  }

  public render() {

    return (
        <>
            <p>{this.state.verified ? 'Account is now verified. Please login.' : this.props.userInformation.message}</p>

            
        </>
    )
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
