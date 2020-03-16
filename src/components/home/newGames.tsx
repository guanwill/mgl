import React, { useEffect, useState } from "react";
import api, { IApi } from "../../api";
import { Container, Grid, Link, makeStyles } from "@material-ui/core";
import moment from "moment";
import { NewGamesContainer, SubHeadingWrapper2 } from "../../styles/styles";

const NewGames: React.FC = () => {
  const [newGames, setNewGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLatestGames = async (api: IApi) => {
    const response = await api.giantBombApi.fetchLatestGames();
    setNewGames(response.results);
    setLoading(false);
  };

  useEffect(() => {
    getLatestGames(api);
  }, []);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    }
  }));

  const classes = useStyles({});

  //   const strip = html => {
  //     var doc = new DOMParser().parseFromString(html, "text/html");
  //     return doc.body.textContent || "";
  //   };

  const onError = e => {
    e.target.src =
    "https://i.postimg.cc/28ngFvKc/defaultfailedphoto.jpg";    
  };

  return (
    <Container>
      <div className={classes.root}>
        <SubHeadingWrapper2>
          <h1>Latest Games</h1>
        </SubHeadingWrapper2>
        <NewGamesContainer>
          {loading ? <p>loading...</p> : newGames.map(game => (
            <div className="upcomingGameContainer" key={game.id}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={1}>
                  <img alt="" src={game.image.icon_url} onError={onError} />
                </Grid>
                <Grid className="upcomingGameName" item xs={12} sm={12} md={3}>
                  <b>
                    <Link href={game.site_detail_url}>{game.name}</Link>
                  </b>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  {game.original_release_date
                    ? moment(game.original_release_date).format("DD/MM/YYYY")
                    : "N/A"}
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  {game.platforms.map(platform => platform.name).join(", ")}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  {game.deck}
                </Grid>
                {/* <Grid item xs={1}>
                df
              </Grid>
              <Grid item xs={1}>
                dsf
              </Grid> */}
              </Grid>
            </div>
          ))}
        </NewGamesContainer>
      </div>
    </Container>
  );
};

export default NewGames;
