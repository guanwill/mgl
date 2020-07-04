import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getPublicGamesListForUser } from "../../actions/game/gameActions";
import { AppState } from "../../store";
import { IUserGamesStore, GameStatus } from "../../model/game/game";

// MUI
import Container from "@material-ui/core/Container";
import { SubHeadingWrapper } from "../../styles/styles";
import PublicGamesListItem from "./publicGamesListItem";

interface Props {
  userGames: IUserGamesStore;
  getPublicGamesListForUser(user_id: string): void;
}

interface State {}

interface RouteParams {
  user_id: string;
  game_id: string;
}

export class PublicGamesList extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await this.props.getPublicGamesListForUser(this.props.match.params.user_id);
  };

  public render() {
    const { games, isLoading } = this.props.userGames;

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
            <SubHeadingWrapper>
              <h1>Inventory</h1>
            </SubHeadingWrapper>

            {console.log("user games: ", games)}

            {isLoading ? (
              <p style={{ margin: "30px 0" }}>loading...</p>
            ) : (
              <>
                {gamesPlaying.length ? (
                  <PublicGamesListItem title="Playing" games={gamesPlaying} />
                ) : (
                  ""
                )}
                {gamesWishlist.length ? (
                  <PublicGamesListItem title="Wishlist" games={gamesWishlist} />
                ) : (
                  ""
                )}
                {gamesOnHold.length ? (
                  <PublicGamesListItem title="On Hold" games={gamesOnHold} />
                ) : (
                  ""
                )}
                {gamesFinished ? (
                  <PublicGamesListItem title="Finished" games={gamesFinished} />
                ) : (
                  ""
                )}
              </>
            )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userGames: state.userGames,
});

const mapDispatchToProps = {
  getPublicGamesListForUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicGamesList);
