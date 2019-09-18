import React from "react";
import { connect } from "react-redux";
import { callFetchGamesApi } from "../../actions/game/gameActions";
import { AppState, IUserGames } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";
import { Link } from "react-router-dom";

interface Props {
  userGames: IUserGames;
  callFetchGamesApi(user_id: string): void;
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
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  //   handleInputChange(event: { target: { name: any; value: any } }) {
  //     const newState = { [event.target.name]: event.target.value } as Pick<
  //       State,
  //       keyof State
  //     >;
  //     this.setState(newState);
  //   }

  componentDidMount = async () => {
    if (isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/login");
    }
    // console.log('asdfasdfsaf', JSON.stringify(this.props.match.params.user_id))
    await this.props.callFetchGamesApi(this.props.match.params.user_id);
  };

  //   componentWillMount = () => {
  //     this.props.userInformation.message = ''
  //   };

  public render() {
    const { games } = this.props.userGames;

    return (
      <>
        <h1>My Games</h1>

        {console.log("user games: ", games)}

        <Link to={`/user/${this.props.match.params.user_id}/games/add`}>Add Game</Link>

        <div>
          <p>hey</p>

            {games.map(game => (
                <div>
                    <p>{game._id}</p>
                    <p>{game.title}</p>
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
  callFetchGamesApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
