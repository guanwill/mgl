import React from "react";
import { connect } from "react-redux";
import { callFetchGamesApi, callDeleteGameApi } from "../../actions/game/gameActions";
import { AppState, IUserGamesStore } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";
import { Link } from "react-router-dom";

interface Props {
  userGames: IUserGamesStore;
  callFetchGamesApi(user_id: string): void;
  callDeleteGameApi(user_id: string, game_id: string): void;
}

interface State {}

interface RouteParams {
  user_id: string;
}

export class Games extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    if (isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/login");
    }
    await this.props.callFetchGamesApi(this.props.match.params.user_id);
  };

  deleteGame = (user_id, game_id) => {
     if(window.confirm('Delete Game?') ) {
        this.props.callDeleteGameApi(user_id, game_id);
     }    
  };

  public render() {
    const { games } = this.props.userGames;

    return (
      <>
        <h1>My Games</h1>

        {console.log("user games: ", games)}

        <Link to={`/user/${this.props.match.params.user_id}/games/add`}>
          Add Game
        </Link>

        <div>
          <p>hey</p>

          {games.map(game => (
            <div>
              <p>{game._id}</p>
              <p>{game.title}</p>
              <button
                onClick={() => this.deleteGame(
                    this.props.match.params.user_id,
                    game._id 
                )}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userGames: state.userGames
});

const mapDispatchToProps = {
  callFetchGamesApi,
  callDeleteGameApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
