import React from "react";
import { connect } from "react-redux";
import {
  callUpdateGameApi,
  callDeleteGameApi
} from "../../actions/game/gameActions";
import { AppState, IUserGamesStore } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

// MUI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {
  ButtonWrapper,
  InputField,
  SelectField,
  TextAreaField,
  PageTitle,
  ContainerInner,
  BackLinkWrapper
} from "../../styles/styles";
import { Link } from "react-router-dom";

interface Props {
  callUpdateGameApi(
    title: string,
    genre: string,
    platform: string,
    release_date: string,
    status: string,
    rating: number,
    review: string,
    comments: string,
    user_id: string,
    game_id: string
  ): void;
  callDeleteGameApi(user_id: string, game_id: string);
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

  deleteGame = (user_id, game_id) => {
    if (window.confirm("Delete Game?")) {
      this.props.callDeleteGameApi(user_id, game_id);
    }
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
      };
      this.setState(newGameState);
    }
  };

  public render() {
    return (
      <Container>
        <ContainerInner>
          <BackLinkWrapper>
            <Link to={`/user/${this.props.match.params.user_id}/games/`}>
              Back
            </Link>
          </BackLinkWrapper>
          <PageTitle>Edit Game</PageTitle>

          <div>
            <form id="EditGame" onSubmit={this.handleSubmit}>
              <div>
                <InputField
                  type="input"
                  placeholder="Title"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  required={true}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <div>
                <SelectField
                  name="genre"
                  id="genre"
                  value={this.state.genre ? this.state.genre : ""}
                  onChange={e => this.handleInputChange(e)}
                >
                  <option value="">Select Genre</option>
                  <option value="adventure">Adventure</option>
                  <option value="action">Action</option>
                  <option value="fighting">Fighting</option>
                  <option value="fps">FPS</option>
                  <option value="sport">Sport</option>
                  <option value="rpg">RPG</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="simulation">Simulation</option>
                  <option value="other">Other</option>
                </SelectField>
              </div>

              <div>
                <SelectField
                  name="platform"
                  id="platform"
                  value={this.state.platform}
                  onChange={e => this.handleInputChange(e)}
                  required={true}
                >
                  <option value="">Select Platform</option>
                  <option value="playstation">Playstation</option>
                  <option value="xbox">XBOX</option>
                  <option value="switch">Nintendo Switch</option>
                  <option value="pc">PC</option>
                  <option value="Other">Other</option>
                </SelectField>
              </div>

              <div>
                <InputField
                  type="input"
                  placeholder="Release date"
                  className="form-control"
                  name="release_date"
                  onFocus={e => (e.target.type = "date")}
                  value={this.state.release_date ? this.state.release_date : ""}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <div>
                <SelectField
                  name="status"
                  id="status"
                  value={this.state.status}
                  onChange={e => this.handleInputChange(e)}
                  required={true}
                >
                  <option value="">select Status</option>
                  <option value="playing">Playing</option>
                  <option value="finished">Finished</option>
                  <option value="on_hold">On Hold</option>
                  <option value="wishlist">On Wishlist</option>
                  <option value="maybe">Maybe</option>
                  <option value="started">Just Started</option>
                  <option value="half_way">Half way</option>
                </SelectField>
              </div>

              <div>
                <InputField
                  type="number"
                  placeholder="Rating"
                  className="form-control"
                  name="rating"
                  value={this.state.rating ? this.state.rating : Number("")}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <div>
                <TextAreaField
                  placeholder="Review"
                  className="form-control"
                  name="review"
                  value={this.state.review ? this.state.review : ""}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <TextAreaField
                placeholder="Comments"
                className="form-control"
                name="comments"
                value={this.state.comments ? this.state.comments : ""}
                onChange={e => this.handleInputChange(e)}
              />

              <div>
                <ButtonWrapper>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    form="EditGame"
                  >
                    Update Game
                  </Button>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={() => {
                      this.deleteGame(
                        this.props.match.params.user_id,
                        this.props.match.params.game_id
                      );
                    }}
                  >
                    Delete Game
                  </Button>
                </ButtonWrapper>
              </div>
            </form>
          </div>
        </ContainerInner>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userGames: state.userGames
});

const mapDispatchToProps = {
  callUpdateGameApi,
  callDeleteGameApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGame);
