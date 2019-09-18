import React from "react";
import { connect } from "react-redux";
import { callAddGameApi } from "../../actions/game/gameActions";
import { AppState, IUserGames } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

interface Props {
  callAddGameApi(title: string, user_id: string): void;
  userGames: IUserGames;
}

interface State {
  title: string;
}

interface RouteParams {
  user_id: string;
}

export class AddGame extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    await this.props.callAddGameApi(
      this.state.title,
      this.props.match.params.user_id
    );
  };

  componentDidMount = async () => {
    if (isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/login");
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.userGames.message === "Game added") {
      this.props.history.push(`/user/${this.props.match.params.user_id}/games`);
    }
  };

  componentWillMount = () => {
    this.props.userGames.message = "";
  };

  public render() {
    return (
      <>
        <h1>Add Game</h1>

        <p>{this.props.userGames.message}</p>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group"></div>
            <div className="form-group">
              <input
                type="input"
                placeholder="Title"
                className="form-control"
                name="title"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add Game
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userGames: state.userGames
});

const mapDispatchToProps = {
  callAddGameApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGame);
