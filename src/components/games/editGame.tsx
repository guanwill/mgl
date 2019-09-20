import React from "react";
import { connect } from "react-redux";
import { callUpdateGameApi } from "../../actions/game/gameActions";
import { AppState, IUserGamesStore } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

interface Props {
    callUpdateGameApi(title: string, user_id: string, game_id: string): void;
    userGames: IUserGamesStore;
}

interface State {
  title: string;
}

interface RouteParams {
  user_id: string,
  game_id: string,
}

export class EditGame extends React.Component<
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
    await this.props.callUpdateGameApi(
      this.state.title,
      this.props.match.params.user_id,
      this.props.match.params.game_id
    );
  };

  componentDidMount = async () => {
    if (isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/login");
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.userGames.message === "Game updated") {
      this.props.history.push(`/user/${this.props.match.params.user_id}/games`);
    }
  };

  public render() {
    return (
      <>
        <h1>Edit Game</h1>

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
                Update
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
    callUpdateGameApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGame);
