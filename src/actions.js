import C from './constants';
import fetch from 'isomorphic-fetch';

export function addDay(resort, date, powder=false, backcountry=false) {
  return {
    "type": C.ADD_DAY,
    "payload": { resort, date, powder, backcountry }
  };
};

export const removeDay = function(date) {
  return {
    "type": C.REMOVE_DAY,
    "payload": date
  };
};

export const setGoal = (goal) => ({
  "type": C.SET_GOAL,
  "payload": goal
});

export const addError = error => ({
    "type": C.ADD_ERROR,
    "payload": error
});

export const clearError = index => ({
    "type": C.CLEAR_ERROR,
    "payload": index
});

export const changeSuggestions = suggestions => ({
    "type": C.CHANGE_SUGGESTIONS,
    "payload": suggestions
});

export const clearSuggestions = () => ({
  "type": C.CLEAR_SUGGESTIONS
});

// thunks
// don't return objects. they return functions
export const randomGoals = () => (dispatch, getState) => {

  // if we're not fetching, then do a fetch
  if (!getState().resortNames.fetching) {

    dispatch({
      "type": C.FETCH_RESORT_NAMES
    });

    setTimeout(() => {
      dispatch({
        "type": C.CANCEL_FETCHING
      })
    }, 1500);

  }

};

export const suggestResortNames = value => dispatch => {

  dispatch({
    "type": C.FETCH_RESORT_NAMES
  });

  // don't forget this returns a promise
  fetch('//localhost:3333/resorts/' + value)
    .then(response => response.json())
    .then(suggestions => {
      dispatch({
        "type": C.CHANGE_SUGGESTIONS,
        "payload": suggestions
      });
    })
    .catch(error => {
      dispatch(addError(error.message));
      dispatch({"type": C.CANCEL_FETCHING });
    });


};
