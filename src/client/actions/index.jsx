import fetch from "isomorphic-fetch";
import Promise from "bluebird";

export const fetchBoardComplete = (data) => {
  return {
    type: "BOARDS_LOADING_COMPLETE",
    data
  };
};

export const chooseBoard = (data) => {
  return {
    type: "CHOOSE_BOARD",
    data
  };
};

export const fetchBoardListComplete = (data) => {
  return {
    type: "BOARD_LIST_COMPLETE",
    data
  };
};

export const fetchBoardCardsComplete = (data) => {
  return {
    type: "BOARD_CARDS_COMPLETE",
    data
  };
};

export const setToken = (data) => {
  return {
    type: "SET_TOKEN",
    data
  };
};

export const setApiKey = (data) => {
  return {
    type: "SET_API_KEY",
    data
  };
};

export const fetchBoards = () => {
  return (dispatch, getState) => {
    const auth = getState().trello.auth;
    const uri = `https://trello.com/1/member/me/boards?key=${auth.apiKey}&token=${auth.token}`;
    return fetch(uri)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return dispatch(fetchBoardComplete(json));
      });
  };
};

export const fetchBoardInfo = (id) => {
  return (dispatch, getState) => {
    const auth = getState().trello.auth;
    const listsUri = `https://api.trello.com/1/boards/${id}/lists?key=${auth.apiKey}&token=${auth.token}`;
    const cardsUri = `https://api.trello.com/1/boards/${id}/cards?actions=all&key=${auth.apiKey}&token=${auth.token}`;
    const lists = fetch(listsUri)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return dispatch(fetchBoardListComplete(json));
      });
    const cards = fetch(cardsUri)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return dispatch(fetchBoardCardsComplete(json));
      });
    return Promise.all([lists, cards]);
  };
};
