import React from "react";
import { connect } from "react-redux";
import { callAddGameApi } from "../../actions/game/gameActions";
import { AppState } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";

// Materialui
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {
  InputField,
  PageTitle,
  ButtonWrapper,
  SelectField,
  TextAreaField,
  ContainerInner,
  BackLinkWrapper
} from "../../styles/styles";
// import { Link } from "react-router-dom";
import { IUserGamesStore, IGameToAdd } from "../../model/game/game";
import { Link as MaterialUiLink } from "@material-ui/core";

interface Props {
  callAddGameApi(
    title: string,
    genre: string,
    platform: string,
    release_date: string,
    status: string,
    rating: number,
    review: string,
    comments: string,
    user_id: string
  ): void;
  userGames: IUserGamesStore;
  gameToAdd: IGameToAdd;
}

interface State {
  title: string;
  status: string;
  platform: string;
  release_date?: string;
  genre?: string | null;
  rating?: number | null;
  review?: string | null;
  comments?: string | null;
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
    await this.props.callAddGameApi(
      this.state.title,
      this.state.genre ? this.state.genre : "",
      this.state.platform,
      this.state.release_date ? this.state.release_date : "",
      this.state.status,
      this.state.rating ? this.state.rating : Number(""),
      this.state.review ? this.state.review : "",
      this.state.comments ? this.state.comments : "",
      this.props.match.params.user_id
    );
  };

  componentDidMount = async () => {
    if (isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/login");
    }
    if (this.props.gameToAdd) {
      this.setState({
        title: this.props.gameToAdd && this.props.gameToAdd.title,
        release_date: this.props.gameToAdd && this.props.gameToAdd.release_date
      });
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

  private goBackToPreviousPage = () => {
    if (this.props.gameToAdd.title) {
      this.props.history.push(`/`);
    } else {
      this.props.history.push(`/user/${this.props.match.params.user_id}/games`);
    }
  };

  public render() {
    return (
      <Container>
        <ContainerInner>
          <BackLinkWrapper>
            {/* <Link 
              to={`/user/${this.props.match.params.user_id}/games/`}>
              Back
            </Link> */}
            <MaterialUiLink
              href="#"
              onClick={() => {
                this.goBackToPreviousPage();
              }}
            >
              Back
            </MaterialUiLink>
          </BackLinkWrapper>
          <PageTitle>Add Game</PageTitle>

          <p>{this.props.userGames.message}</p>

          <div>
            <form id="AddGame" onSubmit={this.handleSubmit}>
              <div>
                <InputField
                  type="input"
                  value={this.state.title}
                  placeholder="Title"
                  className="form-control"
                  name="title"
                  required={true}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <div>
                <SelectField
                  name="genre"
                  id="genre"
                  onChange={e => this.handleInputChange(e)}
                >
                  <option value="">Select Genre</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Action">Action</option>
                  <option value="Fighting">Fighting</option>
                  <option value="FPS">FPS</option>
                  <option value="Sport">Sport</option>
                  <option value="RPG">RPG</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Other">Other</option>
                </SelectField>
              </div>

              <div>
                <SelectField
                  name="platform"
                  id="platform"
                  onChange={e => this.handleInputChange(e)}
                  required={true}
                >
                  <option value="">Select Platform</option>
                  <option value="Playstation">Playstation</option>
                  <option value="XBOX">XBOX</option>
                  <option value="Switch">Nintendo Switch</option>
                  <option value="PC">PC</option>
                  <option value="Other">Other</option>
                </SelectField>
              </div>

              <div>
                <InputField
                  type="date"
                  value={this.state.release_date}
                  placeholder="Release date"
                  className="form-control"
                  name="release_date"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <div>
                <SelectField
                  name="status"
                  id="status"
                  onChange={e => this.handleInputChange(e)}
                  required={true}
                >
                  <option value="">Select Status</option>
                  <option value="Playing">Playing</option>
                  <option value="Finished">Finished</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Wishlist">On Wishlist</option>
                  <option value="Maybe">Maybe</option>
                  <option value="Started">Just Started</option>
                  <option value="Half Way">Half way</option>
                </SelectField>
              </div>

              <div>
                <InputField
                  type="number"
                  placeholder="Rating"
                  className="form-control"
                  name="rating"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <div>
                <TextAreaField
                  placeholder="Review"
                  className="form-control"
                  name="review"
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <TextAreaField
                placeholder="Comments"
                className="form-control"
                name="comments"
                onChange={e => this.handleInputChange(e)}
              />

              <div>
                <ButtonWrapper>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    form="AddGame"
                  >
                    Add Game
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
  userGames: state.userGames,
  gameToAdd: state.gameToAdd
});

const mapDispatchToProps = {
  callAddGameApi
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGame);
