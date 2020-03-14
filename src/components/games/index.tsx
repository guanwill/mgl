import React from "react";
import { connect } from "react-redux";
import {
  callFetchGamesApi,
  callDeleteGameApi
} from "../../actions/game/gameActions";
import { AppState } from "../../store";
import { IUserGamesStore } from "../../model/game/game";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";
import { Link } from "react-router-dom";
import moment from "moment";

// MUI
import Container from "@material-ui/core/Container";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import {
  ButtonWrapper,
  MuiTableWrapper,
  ContainerInner,
  SubHeadingWrapper
} from "../../styles/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
        name: "",
        label: "",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "title",
        label: "Title",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "release_date",
        label: "Date",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const game = games.find(
              game => game.title === tableMeta.rowData[1]
            )!;
            const release_date = game.release_date;
            if (release_date) {
              return moment(new Date(release_date)).format("DD/MM/YYYY");
            }
          }
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
        name: "Actions",
        label: "Actions",
        options: {
          filter: false,
          sort: false,

          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <Link
                  to={`/user/${this.props.match.params.user_id}/games/${
                    games.find(game => game.title === tableMeta.rowData[1])!._id
                  }/edit`}
                >
                  <VisibilityIcon />
                </Link>
              </>
            );
          }
        }
      }
    ];

    const data = games;

    const options = {
      responsive: "scrollMaxHeight",
      pagination: false,
      filter: true,
      print: false,
      download: false,
      viewColumns: false,
      selectableRows: "none"
      //  filterType: 'checkbox',
      // onRowClick
      // onCellClick
    };

    return (
      <>
        <Container>
          <ContainerInner>
            <SubHeadingWrapper>
              <h1>Inventory</h1>
            </SubHeadingWrapper>            

            {console.log("user games: ", games)}

            {/* only appear for logged in user, no one else */}
            <ButtonWrapper>
              <Button
                component={Link}
                to={`/user/${this.props.match.params.user_id}/games/add`}
                variant="outlined"
                color="primary"
              >
                Add Game
              </Button>
            </ButtonWrapper>

            <MuiTableWrapper>
              <MUIDataTable
                title={""}
                data={data}
                columns={columns}
                options={options}
              />
            </MuiTableWrapper>
          </ContainerInner>
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
