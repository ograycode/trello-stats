import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import {fetchBoards, chooseBoard, fetchBoardInfo, setApiKey, setToken} from "../actions";


class Setup extends React.Component {

  fetchBoardsClick() {
    this.props.dispatch(fetchBoards());
  }

  chooseBoard(id) {
    this.props.dispatch(chooseBoard(id));
    this.props.dispatch(fetchBoardInfo(id));
  }

  apiKeyChange(e) {
    this.props.dispatch(setApiKey(e.target.value));
  }

  tokenChange(e) {
    this.props.dispatch(setToken(e.target.value));
  }

  render() {
    const auth = this.props.auth;
    const boards = this.props.boards;
    const lists = this.props.lists;
    const cards = this.props.cards;
    const dash = this.props.dash;
    const boardNodes = [];
    if (boards && boards.length > 0) {
      boards.forEach((board) => {
        const selected = (dash.board === board.id) ? "-->" : "";
        const el = (
          <div className="item" onClick={this.chooseBoard.bind(this, board.id)}>
            {selected} {board.name}
          </div>);
        boardNodes.push(el);
      });
    }
    return (
      <div className="ui container">
        <div className="ui two column stackable grid">
          <div className="sixteen wide column">
            <h1>Step 1: Enter api information </h1>
          </div>
          <div className="column">
            <div className="ui form">
              <div className="two fields">
                <div className="field">
                  <label>Token</label>
                  <input
                    type="text"
                    onChange={this.tokenChange.bind(this)}
                    value={auth.token}/>
                </div>
                <div className="field">
                  <label>API Key</label>
                  <input
                    type="text"
                    onChange={this.apiKeyChange.bind(this)}
                    value={auth.apiKey}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui one column grid">
          <div className="column">
            <h1>Step 2: Select board</h1>
          </div>
          <div className="column">
            <button onClick={this.fetchBoardsClick.bind(this)} className="ui primary button">
              Get Boards
            </button>
          </div>
          <div className="column">
            <div className="list">{boardNodes}</div>
          </div>
        </div>
      </div>
    );
  }
}

Setup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  dash: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.trello.auth,
    boards: state.trello.boards,
    lists: state.trello.lists,
    cards: state.trello.cards,
    dash: state.trello.dash
  };
};

export default connect(mapStateToProps)(Setup);
