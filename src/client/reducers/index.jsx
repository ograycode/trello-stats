import {combineReducers} from "redux";
import _ from "lodash";

const trello = (store, action) => {
  switch (action.type) {
  case "BOARDS_LOADING_COMPLETE":
    return _.merge({}, store, {boards: action.data});
  case "BOARD_LIST_COMPLETE":
    return _.merge({}, store, {lists: action.data});
  case "BOARD_CARDS_COMPLETE":
    return _.merge({}, store, {cards: action.data});
  case "CHOOSE_BOARD":
    return _.merge({}, store, {cfd: {board: action.data}});
  case "SET_TOKEN":
    return _.merge({}, store, {auth: {token: action.data}});
  case "SET_API_KEY":
    return _.merge({}, store, {auth: {apiKey: action.data}});
  }
  const defaultStore = {
    auth: {
      token: "",
      apiKey: ""
    },
    boards: [],
    lists: [],
    cards: [],
    cfd: {
      board: undefined,
      data: []
    }
  };
  return store || defaultStore;
};

export default combineReducers({
  trello
});
