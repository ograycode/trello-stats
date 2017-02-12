import {combineReducers} from "redux";

const trello = (store, action) => {
  switch (action.type) {
  case "BOARDS_LOADING_COMPLETE":
    return Object.assign({}, store, {boards: action.data});
  case "BOARD_LIST_COMPLETE":
    return Object.assign({}, store, {lists: action.data});
  case "BOARD_CARDS_COMPLETE":
    return Object.assign({}, store, {cards: action.data});
  case "CHOOSE_BOARD":
    return Object.assign({}, store, {cfd: {board: action.data}});
  case "SET_TOKEN":
    return Object.assign({}, store, {auth: {token: action.data}});
  case "SET_API_KEY":
    return Object.assign({}, store, {auth: {apiKey: action.data}});
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
