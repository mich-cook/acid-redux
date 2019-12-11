import React from 'react';
import ReactDOM from 'react-dom';

import storeFactory from './store';
import { Provider } from 'react-redux';
import initialState from './initialState.json';

import { addError } from './actions';

import App from './App';
/*
import {
  addDay, removeDay, setGoal, 
  addError, clearError, changeSuggestions, clearSuggestions,
  randomGoals,
  suggestResortNames
} from './actions';
*/
const saveState = () => localStorage['redux-store'] = JSON.stringify(store.getState());
const handleError = (error) => {
  store.dispatch(
    addError(error.message)
  )
}

const store = storeFactory(initialState);
store.subscribe(saveState);

window.React = React;
window.store = store;

// any error in the JS will now cause an error to be shown to the user
window.addEventListener("error", handleError);
/*
store.dispatch(
  suggestResortNames("hea")
);
*/
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
, document.getElementById('react-container'));
