import React, {PropTypes} from "react";
import {connect} from "react-redux";
/**/
import Dashboard from "./dashboard";
import Setup from "./setup";

class Home extends React.Component {

  render() {
    const auth = this.props.auth;
    const boards = this.props.boards;
    const lists = this.props.lists;
    const dash = this.props.dash;
    const cards = this.props.cards;
    let component = <Dashboard />;
    if (!auth.token || !auth.apiKey || !boards.length || !lists.length || !cards.length) {
      component = <Setup />;
    }
    return (
      <div>{component}</div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  dash: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
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

export default connect(mapStateToProps)(Home);
