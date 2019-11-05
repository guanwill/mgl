import React from "react";
import { connect } from "react-redux";
import { callFetchGamesApi, callDeleteGameApi } from "../../actions/game/gameActions";
import { AppState, IUserGamesStore } from "../../store";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../../helpers/isTokenExpired";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles, lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import TablePagination from '@material-ui/core/TablePagination';


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
    this.props.userGames.message = '';
  }

  deleteGame = (user_id, game_id) => {
     if(window.confirm('Delete Game?') ) {
        this.props.callDeleteGameApi(user_id, game_id);
     }    
  };

  // createData = (title, status, platform, release_date, genre, rating, review, comments) => {
  //   return { name, calories, fat, carbs, protein };
  // }

  public render() {
    const { games } = this.props.userGames;

    // const rows = [
    //   this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // ];

    function desc(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    function stableSort(array, cmp) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map(el => el[0]);
    }
    
    function getSorting(order, orderBy) {
      return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }

    const headCells = [
      { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
      { id: 'platform', numeric: false, disablePadding: false, label: 'Platform' },
      { id: 'status', numeric: false, disablePadding: false, label: 'status' },
      { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
    ];
    

    const GamesTable = () => {
      const useStyles = makeStyles(theme => ({
        root: {
          width: '100%',
          marginTop: theme.spacing(3),
        },
        paper: {
          width: '100%',
          marginBottom: theme.spacing(2),
        },
        table: {
          minWidth: 750,
        },
        tableWrapper: {
          overflowX: 'auto',
        },
        visuallyHidden: {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          top: 20,
          width: 1,
        },
      }));
  
      const classes = useStyles();

      function EnhancedTableHead(props) {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = property => event => {
          onRequestSort(event, property);
        };
      
        return (
          <TableHead>
            <TableRow>
              {headCells.map(headCell => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={order}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        );
      }

      // EnhancedTableHead.propTypes = {
      //   classes: PropTypes.object.isRequired,
      //   numSelected: PropTypes.number.isRequired,
      //   onRequestSort: PropTypes.func.isRequired,
      //   onSelectAllClick: PropTypes.func.isRequired,
      //   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      //   orderBy: PropTypes.string.isRequired,
      //   rowCount: PropTypes.number.isRequired,
      // };

      
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(title);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, title);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  // const handleChangeDense = event => {
  //   setDense(event.target.checked);
  // };

  // const isSelected = title => selected.indexOf(title) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, games.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(games, getSorting(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((game, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={game.title}
                    >

              <TableCell component="th" scope="game">{game.title} <span>{game.release_date}</span></TableCell>
              <TableCell align="right">{game.platform}</TableCell>
              <TableCell align="right">{game.status}</TableCell>
              <TableCell align="right">
              <button
                onClick={() => this.deleteGame(
                    this.props.match.params.user_id,
                    game._id 
                )}
              >
                Delete
              </button>

              <Link to={`/user/${this.props.match.params.user_id}/games/${game._id}/edit`}>
                Edit Game
                </Link>

              </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </div>

      </Paper>

    </div>
  );







      //  ------------ //



    //   return <Paper className={classes.root}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Title</TableCell>
    //         <TableCell align="right">platform</TableCell>
    //         <TableCell align="right">status</TableCell>
    //         <TableCell align="right">Actions</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {games.map(game => (
    //         <TableRow key={game._id}>
    //           <TableCell component="th" scope="game">{game.title} <span>{game.release_date}</span></TableCell>
    //           <TableCell align="right">{game.platform}</TableCell>
    //           <TableCell align="right">{game.status}</TableCell>
              
    //           {/* for if sharing this */}
    //           {/* <TableCell align="right">{game.rating}</TableCell> */}
    //           {/* <TableCell align="right">{game.review}</TableCell> */}
    //           {/* <TableCell align="right">{game.comments}</TableCell> */}

    //           <TableCell align="right">
    //           <button
    //             onClick={() => this.deleteGame(
    //                 this.props.match.params.user_id,
    //                 game._id 
    //             )}
    //           >
    //             Delete
    //           </button>

    //           <Link to={`/user/${this.props.match.params.user_id}/games/${game._id}/edit`}>
    //             Edit Game
    //             </Link>

    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </Paper>
    
    }

    return (
      <>
        <h1>My Games</h1>

       <GamesTable/>

        {console.log("user games: ", games)}

        {/* only appear for logged in user, no one else */}
        <Link to={`/user/${this.props.match.params.user_id}/games/add`}>
          Add Game
        </Link>



        {/* <div>
          <p>hey</p>

          {games.map(game => (
            <div>
              <p>{game._id}</p>
              <p>{game.title}</p>
              <button
                onClick={() => this.deleteGame(
                    this.props.match.params.user_id,
                    game._id 
                )}
              >
                Delete
              </button>

              <Link to={`/user/${this.props.match.params.user_id}/games/${game._id}/edit`}>
                Edit Game
                </Link>
            </div>
          ))}
        </div> */}



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
