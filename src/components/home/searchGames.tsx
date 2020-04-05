import React, { useState } from "react";
import moment from "moment";
import api from "../../api";
import { useDispatch } from "react-redux";
import { addSearchedGame } from "../../actions/game/gameActions";
import { Container, Grid, Link, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import {
  SubHeadingWrapper2,
  ContainerInner,
  ButtonWrapper,
  SearchField,
  SearchGamesContainer,
  AddGameButtonWrapper
} from "../../styles/styles";
import { useHistory } from "react-router-dom";
import getAuthenticatedUser from "../../helpers/getAuthenticatedUser";
import isTokenExpired from "../../helpers/isTokenExpired";

const SearchGames: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // let location = useLocation();
  // let params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  const [loading, setLoading] = useState(null);

  const userId = getAuthenticatedUser();
  const isUserTokenExpired = isTokenExpired();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSearchQuery("");
    const response = await api.giantBombApi.searchGame(searchQuery);
    setSearchGames(response);
    setLoading(false);
  };

  const handleInputChange = async event => {
    setSearchQuery(event.target.value);
  };

  const onError = e => {
    e.target.src = "https://i.postimg.cc/28ngFvKc/defaultfailedphoto.jpg";
  };

  const addGame = game => {
    const searchedGame = {
      title: game.name,
      release_date: moment(game.original_release_date).format("YYYY-MM-DD")
    };

    dispatch(addSearchedGame(searchedGame));
    history.push(`/user/${userId}/games/add`);
  };

  return (
    <Container>
      <div>
        <SubHeadingWrapper2>
          <h1>Search Games</h1>
        </SubHeadingWrapper2>

        <div>
          <ContainerInner>
            <form id="searchGame" onSubmit={e => handleSubmit(e)}>
              <div>
                <SearchField
                  type="input"
                  placeholder="Title"
                  className="form-control"
                  name="title"
                  required={true}
                  value={searchQuery}
                  onChange={e => handleInputChange(e)}
                />
              </div>

              <div>
                <ButtonWrapper>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    form="searchGame"
                  >
                    Search
                  </Button>
                </ButtonWrapper>
              </div>
            </form>
          </ContainerInner>
        </div>

        <div>
          <SearchGamesContainer>
            {loading ? (
              <p>loading....</p>
            ) : (
              searchGames &&
              searchGames.map(game => (
                <div className="searchGameContainer" key={game.id}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={1}>
                      <img alt="" src={game.image.icon_url} onError={onError} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <b>
                        <Link href={game.site_detail_url}>{game.name}</Link>
                      </b>
                      {userId && !isUserTokenExpired && (
                        <AddGameButtonWrapper>
                          <Button
                            className="addGameButton"
                            type="submit"
                            onClick={() => {
                              addGame(game);
                            }}
                          >
                            <AddCircleOutlineIcon />
                          </Button>
                        </AddGameButtonWrapper>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      {game.platforms && game.platforms.map(platform => platform.name).join(", ")}
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      {game.deck ? game.deck : ''}
                    </Grid>
                  </Grid>
                </div>
              ))
            )}
          </SearchGamesContainer>
        </div>
      </div>
    </Container>
  );
};

export default SearchGames;
