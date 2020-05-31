import React from "react";
import { connect } from "react-redux";
import {
  callFetchGamesApi,
  callDeleteGameApi,
  executeClearSearchedGame,
} from "../../actions/game/gameActions";
import { AppState } from "../../store";
import { IUserGamesStore, GameStatus } from "../../model/game/game";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

// MUI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {
  ButtonWrapper,
  ContainerInner,
  SubHeadingWrapper,
} from "../../styles/styles";
import GameTable from "./gameTable";

interface Props {
  userGames: IUserGamesStore;
  callFetchGamesApi(user_id: string): void;
  callDeleteGameApi(user_id: string, game_id: string): void;
  executeClearSearchedGame(): void;
}

interface State {}

interface RouteParams {
  user_id: string;
  game_id: string;
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

  componentWillMount = async () => {
    this.props.userGames.message = "";
  };

  deleteGame = (user_id, game_id) => {
    if (window.confirm("Delete Game?")) {
      this.props.callDeleteGameApi(user_id, game_id);
    }
  };

  redirectToAddGamePage = () => {
    this.props.executeClearSearchedGame();
    this.props.history.push(
      `/user/${this.props.match.params.user_id}/games/add`
    );
  };

  public render() {
    const { games } = this.props.userGames;

    const gamesPlaying = games.filter((g) => g.status === GameStatus.PLAYING);
    const gamesFinished = games.filter((g) => g.status === GameStatus.FINISHED);
    const gamesOnHold = games.filter((g) => g.status === GameStatus.ON_HOLD);
    const gamesWishlistWithNullReleaseDate = games.filter(
      (g) => g.status === GameStatus.WISHLIST && g.release_date === null
    );
    const gamesWishlistWithReleaseDate = games.filter(
      (g) => g.status === GameStatus.WISHLIST && g.release_date !== null
    );
    const gamesMaybeWithNullReleaseDate = games.filter(
      (g) => g.status === GameStatus.MAYBE && g.release_date === null
    );
    const gamesMaybeWithReleaseDate = games.filter(
      (g) => g.status === GameStatus.MAYBE && g.release_date !== null
    );

    const gamesWishListAndMaybeWithReleaseDate = [
      ...gamesWishlistWithReleaseDate,
      ...gamesMaybeWithReleaseDate,
    ].sort((a, b) => {
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });
    const gamesWishlist = [
      ...gamesWishListAndMaybeWithReleaseDate,
      ...gamesWishlistWithNullReleaseDate,
      ...gamesMaybeWithNullReleaseDate,
    ];

    return (
      <>
        <Container>
          <ContainerInner>
            <SubHeadingWrapper>
              <h1>Inventory</h1>
            </SubHeadingWrapper>

            {console.log("user games: ", games)}

            {/* only appear for logged in user, no one else */}
            <ButtonWrapper>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  this.redirectToAddGamePage();
                }}
              >
                Add Game
              </Button>
            </ButtonWrapper>

            {gamesPlaying.length ? (
              <GameTable
                title="Playing"
                games={gamesPlaying}
                userId={this.props.match.params.user_id}
              />
            ) : (
              ""
            )}
            {gamesWishlist.length ? (
              <GameTable
                title="Wishlist"
                games={gamesWishlist}
                userId={this.props.match.params.user_id}
              />
            ) : ""}
            {gamesOnHold.length ? (
              <GameTable
                title="On Hold"
                games={gamesOnHold}
                userId={this.props.match.params.user_id}
              />
            ): ""}
            {gamesFinished ? (
              <GameTable
                title="Finished"
                games={gamesFinished}
                userId={this.props.match.params.user_id}
              />
            ): ""}
          </ContainerInner>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userGames: state.userGames,
});

const mapDispatchToProps = {
  callFetchGamesApi,
  callDeleteGameApi,
  executeClearSearchedGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
