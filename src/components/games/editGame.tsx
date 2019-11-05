import React from "react";
import { connect } from "react-redux";
import { callUpdateGameApi } from "../../actions/game/gameActions";
import { AppState, IUserGamesStore } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";
import { IGame } from "../../model/game/game";

interface Props {
  callUpdateGameApi(title: string, genre: string, platform: string, release_date: string, status: string, rating: number, review: string, comments: string, user_id: string, game_id: string): void;
  userGames: IUserGamesStore;
}

interface State {
  title: string;
  status: string;
  platform: string;
  release_date?: string | null;
  genre?: string | null;
  rating?: number | null;
  review?: string | null;
  comments?: string | null;
}

interface RouteParams {
  user_id: string;
  game_id: string;
}

export class EditGame extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genre: "",
      platform: "",
      release_date: "",
      status: "",
      rating: null,
      review: "",
      comments: ""
    };
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
      
      this.state.genre ? this.state.genre : "",
      this.state.platform,
      this.state.release_date ? this.state.release_date : "",
      this.state.status,
      this.state.rating ? this.state.rating : Number(""),
      this.state.review ? this.state.review : "",
      this.state.comments ? this.state.comments : "",

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

  componentWillMount = () => {
    const gamesList = this.props.userGames.games;
    const gameToEditId = this.props.match.params.game_id;
    const gameToEdit = gamesList.find(game => game._id === gameToEditId);
    
    let newGameState;

    if (gameToEdit) {
        newGameState = {
            _id: gameToEdit._id,
            user: gameToEdit.user,
            title: gameToEdit.title,
            genre: gameToEdit.genre,
            platform: gameToEdit.platform,
            release_date: gameToEdit.release_date,
            status: gameToEdit.status,
            rating: gameToEdit.rating,
            review: gameToEdit.review,
            comments: gameToEdit.comments
        }
        this.setState(newGameState)
    }      
  }

  public render() {
    return (
      <>
        <h1>Edit Game</h1>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="input"
                placeholder="Title"
                className="form-control"
                name="title"
                value={this.state.title}
                required={true}
                onChange={e => this.handleInputChange(e)}
              />
            </div>            

            <div className="form-group">
                <select
                    name="genre"
                    id="genre"
                    value={this.state.genre}
                    onChange={e => this.handleInputChange(e)}
                >
                    <option value="">Please select</option>
                    <option value="adventure">Adventure</option>
                    <option value="action">Action</option>
                    <option value="fighting">Fighting</option>
                    <option value="fps">FPS</option>
                    <option value="sport">Sport</option>
                    <option value="rpg">RPG</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="simulation">Simulation</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="form-group">
                <select
                    name="platform"
                    id="platform"
                    value={this.state.platform}
                    onChange={e => this.handleInputChange(e)}
                    required={true}
                >
                    <option value="">Please select</option>
                    <option value="playstation">Playstation</option>
                    <option value="xbox">XBOX</option>
                    <option value="switch">Nintendo Switch</option>
                    <option value="pc">PC</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="form-group">
              <input
                type="input"
                placeholder="Release date"
                className="form-control"
                name="release_date"
                onFocus={(e) => e.target.type = 'date'}
                value={this.state.release_date ? new Date(this.state.release_date).toISOString().substr(0,10) : ""}
                onChange={e => this.handleInputChange(e)}
              />
            </div>

            <div className="form-group">
                <select
                    name="status"
                    id="status"
                    value={this.state.status}
                    onChange={e => this.handleInputChange(e)}
                    required={true}
                >
                    <option value="">Please select</option>
                    <option value="playing">Playing</option>
                    <option value="finished">Finished</option>
                    <option value="on_hold">On Hold</option>
                    <option value="wishlist">On Wishlist</option>
                    <option value="maybe">Maybe</option>
                    <option value="started">Just Started</option>
                    <option value="half_way">Half way</option>
                </select>
            </div>

            <div className="form-group">
              <input
                type="number"
                placeholder="Rating"
                className="form-control"
                name="rating"
                value={this.state.rating ? this.state.rating : Number("")}
                onChange={e => this.handleInputChange(e)}
              />
            </div>

            <div className="form-group">
              <textarea
              placeholder="Review"
              className="form-control"
              name="review"
              value={this.state.review ? this.state.review : ""}
              onChange={e => this.handleInputChange(e)}
              />                
            </div>

            <textarea
              placeholder="Comments"
              className="form-control"
              name="comments"
              value={this.state.comments ? this.state.comments : ""}
              onChange={e => this.handleInputChange(e)}
              />                

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
