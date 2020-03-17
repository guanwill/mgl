import { combineReducers } from "redux";
import userInformation from "../reducers/auth/authReducer";
import userGames from "../reducers/game/gameReducer";
import gameToAdd from "../reducers/game/gameToAddReducer";
import { IAuthenticatedDetails } from "../model/auth/auth";
import { IUserGamesStore, IGameToAdd } from "../model/game/game";

interface IStore {
  userInformation: IAuthenticatedDetails;
  userGames: IUserGamesStore;
  gameToAdd: IGameToAdd;
}

export const initialState: IStore = {
  userInformation: {
    user: {
      verified: false,
      _id: "",
      username: "",
      name: ""
    },
    accesstoken: "",
    message: ""
  },
  userGames: {
    games: [],
    message: ""
  },
  gameToAdd: {
    title: "",
    release_date: ""
  }
};

export const rootReducer = combineReducers({
  userInformation,
  userGames,
  gameToAdd
});

export type AppState = ReturnType<typeof rootReducer>;
