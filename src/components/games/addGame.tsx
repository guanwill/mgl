import React from "react";
import { connect } from "react-redux";
import { callAddGameApi } from "../../actions/game/gameActions";
import { AppState, IUserGamesStore } from "../../store";
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
import { Link } from "react-router-dom";

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
      <Container>
        <ContainerInner>
          <BackLinkWrapper>
            <Link to={`/user/${this.props.match.params.user_id}/games/`}>
              Back
            </Link>
          </BackLinkWrapper>
          <PageTitle>Add Game</PageTitle>

          <p>{this.props.userGames.message}</p>

          <div>
            <form id="AddGame" onSubmit={this.handleSubmit}>
              <div>
                <InputField
                  type="input"
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
  userGames: state.userGames
});

const mapDispatchToProps = {
  callAddGameApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGame);
