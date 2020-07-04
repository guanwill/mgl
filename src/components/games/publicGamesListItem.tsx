import React from "react";
import moment from "moment";
import { IGame, GameStatus } from "../../model/game/game";
import { Container } from "@material-ui/core";
import {
  AlignLeft,
  PublicGamesStatusText,
  PublicGamesListItemContainerInner,
  PublicGameDate,
  PublicGamePlatform,
  PublicGameName,
} from "../../styles/styles";

interface Props {
  title: string;
  games: IGame[];
}

const PublicGamesListItem: React.FC<Props> = ({ title, games }) => {
  return (
    <>
      <Container style={{"overflow": "hidden"}}>
        <PublicGamesListItemContainerInner>
          <AlignLeft>
            <PublicGamesStatusText>{title}</PublicGamesStatusText>
            {games.map((game) => (
              <p key={game._id}><PublicGameName>{game.title}</PublicGameName> <PublicGamePlatform>{game.platform}</PublicGamePlatform> {title == GameStatus.WISHLIST && <PublicGameDate>{moment(new Date(game.release_date)).format("DD/MM/YYYY")}</PublicGameDate>}</p>
            ))}
          </AlignLeft>
        </PublicGamesListItemContainerInner>
      </Container>
    </>
  );
};

export default PublicGamesListItem;
