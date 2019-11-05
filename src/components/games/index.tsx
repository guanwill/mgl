import React from "react";
import { connect } from "react-redux";
import {
  callFetchGamesApi,
  callDeleteGameApi
} from "../../actions/game/gameActions";
import { AppState, IUserGamesStore } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";
import { Link } from "react-router-dom";

// UI Libraries
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";

interface Props {
  userGames: IUserGamesStore;
  callFetchGamesApi(user_id: string): void;
  callDeleteGameApi(user_id: string, game_id: string): void;
}

interface State {}

interface RouteParams {
  user_id: string;
  game_id: string;
}

export class Games extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    if (isTokenExpired()) {
      console.log("IS EXPIRED? ", isTokenExpired());
      this.props.history.push("/login");
    }
    await this.props.callFetchGamesApi(this.props.match.params.user_id);
  };

  componentWillMount = async () => {
    this.props.userGames.message = "";
  };

  deleteGame = (user_id, game_id) => {
    if (window.confirm("Delete Game?")) {
      this.props.callDeleteGameApi(user_id, game_id);
    }
  };

  public render() {
    const { games } = this.props.userGames;

    const columns = [
      {
        name: "title",
        label: "Title",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "platform",
        label: "Platform",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "actions",
        label: "Actions",
        options: {
          filter: false,
          sort: false,

          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              <button
                onClick={() => {
                  this.deleteGame(
                    this.props.match.params.user_id,
                    games[tableMeta.rowIndex]._id
                  );
                }}
              >
                Delete
              </button>

               <Link
                to={`/user/${this.props.match.params.user_id}/games/${games[tableMeta.rowIndex]._id}/edit`}
              >
                Edit Game
              </Link>
              </>
            );
          }
        }
      }
    ];

    const data = games;

    const options = {
      responsive: "stacked",
      pagination: false,
      filter: false,
      print: false,
      download: false,
      viewColumns: false,
      selectableRows: 'none',
      //  filterType: 'checkbox',
      // onRowClick
      // onCellClick
    };

    return (
      <>
        <Container>
          <h1>My Inventory</h1>

          {console.log("user games: ", games)}

          {/* only appear for logged in user, no one else */}
          <Link to={`/user/${this.props.match.params.user_id}/games/add`}>
            Add Game
          </Link>

          <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userGames: state.userGames
});

const mapDispatchToProps = {
  callFetchGamesApi,
  callDeleteGameApi
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
