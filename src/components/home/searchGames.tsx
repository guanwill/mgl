import React, { useState } from "react";
import api from "../../api";
import { Container, Grid, Link, Button } from "@material-ui/core";
// import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import {
  SubHeadingWrapper2,
  ContainerInner,
  ButtonWrapper,
  SearchField,
  SearchGamesContainer
} from "../../styles/styles";
import { useHistory } from "react-router-dom";
import getAuthenticatedUser from "../../helpers/getAuthenticatedUser";

const SearchGames: React.FC = () => {
  let history = useHistory();
  // let location = useLocation();
  // let params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  const [loading, setLoading] = useState(null);

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

  const addSearchedGame = (game) => {
    console.log('searchedgame....', game);

    const searchedGame = {
      title: game.name,
      release_date: game.original_release_date,      
    }

    
    const userId = getAuthenticatedUser();
    history.push(`/user/${userId}/games/add`)
  }

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
                    {/* <SearchOutlinedIcon/> */}
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
                      <ButtonWrapper>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          onClick={() => {                            
                            addSearchedGame(game)
                          }}
                        >
                          add
                        </Button>
                      </ButtonWrapper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      {game.platforms.map(platform => platform.name).join(", ")}
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      {game.deck}
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
