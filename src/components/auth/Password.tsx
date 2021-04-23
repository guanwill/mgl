import React from 'react';
import { connect } from 'react-redux';
import { IAuthenticatedDetails } from '../../model/auth/auth';
import { callResetPasswordApi } from '../../actions/auth/authActions';
import { AppState } from '../../store';
import { RouteComponentProps } from 'react-router';
import isTokenExpired from '../../helpers/isTokenExpired';
import { PageTitle, ButtonWrapper, InputField } from '../../styles/styles';
import { Container, Button } from '@material-ui/core';

interface Props {
    userInformation: IAuthenticatedDetails;
    callResetPasswordApi: Function;
}

interface State {
    email: string;
}

export class Password extends React.Component<Props & RouteComponentProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleInputChange = async event => {
        const newState = { [event.target.name]: event.target.value } as Pick<State, keyof State>;
        await this.setState(newState);
    };

    handleSubmit = async e => {
        e.preventDefault();
        await this.props.callResetPasswordApi(this.state.email);
    };

    public componentDidMount() {
        if (!isTokenExpired()) {
            console.log('IS EXPIRED? ', isTokenExpired());
            this.props.history.push('/');
        }
    }

    componentWillMount = () => {
        this.props.userInformation.message = '';
    };

    public render() {
        const { userInformation } = this.props;

        return (
            <Container>
                <PageTitle>Forgot Password</PageTitle>

                <p>{userInformation.message}</p>

                <form id="password" onSubmit={this.handleSubmit}>
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
                            <Button variant="contained" color="primary" type="submit" form="password">
                                Reset Password
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
    callResetPasswordApi
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);
