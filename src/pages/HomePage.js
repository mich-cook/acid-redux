import React, {useState} from 'react';
import { connect } from 'react-redux';

import { setGoal, addDay, removeDay, clearError,
  suggestResortNames, /* changeSuggestions, */ clearSuggestions } from '../actions';

const mapStateToProps = (state, props) => {

  return {
/* filtering the days and removing them */
    "days": state.allSkiDays,
/*    "filter": props.params.filter, */

/* all the ski days */
    "allSkiDays": state.allSkiDays,

/* errors */
    "errors": state.errors,

/* statistics */
    "total": state.allSkiDays.length,
    "powder": state.allSkiDays.filter(day => day.powder).length,
    "backcountry": state.allSkiDays.filter(day => day.backcountry).length,

    "goal": state.goal,

/* suggestions */
    "suggestions": state.resortNames.suggestions,
    "fetching": state.resortNames.fetching
  };

};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveDay(date) {
      dispatch(
        removeDay(date)
      )
    },
    onClearError(index) {
      dispatch(
        clearError(index)
      )
    },
    updateGoal(newGoal) {
      dispatch(
        setGoal(newGoal)
      )
    },
    onNewDay({resort, date, powder, backcountry}) {
      dispatch(
        addDay(resort, date, powder, backcountry)
      )
    },
/* is "onChange" in examples */
    onChangeSuggestions(value) {
      if (value) {
        dispatch(
          suggestResortNames(value)
        )
      } else {
        dispatch(clearSuggestions())
      }
    },
/* is "onClear" in examples */
    onClearSuggestions() {
      dispatch(
        clearSuggestions()
      )
    }
  };
};

const HomePage = ({
  goal, total, powder, backcountry,
  days, filter, allSkiDays,
  errors,
  suggestions, fetching,
  onRemoveDay, onClearError, updateGoal, onNewDay,
  onChangeSuggestions, onClearSuggestions }) => {

  const [ newDayResort, setResort ] = useState('');
  const [ newDayDate, setDate ] = useState('');
  const [ newDayPowder, setPowder ] = useState(false);
  const [ newDayBackcountry, setBackcountry ] = useState(false);

  const addNewDay = () => {
// TODO: add error checking
// TODO: add data validation
// TODO: prompt to add another day. if not, switch to info display and hide form
// TODO: create button to show form if it is hidden
    onNewDay({ resort: newDayResort, date: newDayDate, powder: newDayPowder, backcountry: newDayBackcountry });
    setResort('');
    setDate('');
    setPowder(false);
    setBackcountry(false);
  };

  const filterSkiDays = (filter='') => {
    // TODO: get this working
    console.log(`Implement filter: ${filter}`);

  };

/* TODO: show the suggestions for user to select one */
/* TODO: allow user to enter a new value? */

  const submit = (e) => {
    e.preventDefault();
  };

  return(
  <>
    <h1>Hello and welcome to the homepage</h1>
    <h2>Adding a Ski Day</h2>
    <form onSubmit={(event) => submit(event)}>
      <label>Resort: <input value={newDayResort} onChange={(event) => {setResort(event.target.value); onChangeSuggestions(event.target.value)}} type="text" /></label>
      <label>Date: <input value={newDayDate} type="date" onChange={(event) => setDate(event.target.value)} /></label>
      <label>Powder: <input checked={newDayPowder} type="checkbox" onChange={(event) => setPowder(!!event.target.value)} /></label>
      <label>Backcountry: <input checked={newDayBackcountry} type="checkbox" onChange={(event) => setBackcountry(!!event.target.value)}/></label>
      <button onClick={() => addNewDay()}>Add Day</button>
    </form>

    <h2>Ski Day List</h2>
    <p>Add a day using the form above. Remove a day by double clicking it.</p>
    <p>TODO: hook up the filters</p>
    <ul>
      <li key="all" onClick={() => filterSkiDays()}>All</li>
      <li key="powder" onClick={() => filterSkiDays('powder')}>Powder</li>
      <li key="backcountry" onClick={() => filterSkiDays('backcountry')}>Backcountry</li>
    </ul>
    <ul>
      {allSkiDays.map((day, i) => (<li key={i} onDoubleClick={() => onRemoveDay(day.date)}>{day.date} {day.resort}</li>))}
    </ul>

    <h2>Ski Day Statistics</h2>
      <p>Powder days: {powder}</p>
      <p>Backcountry days: {backcountry}</p>
      <p>Total days: {total}</p>
      <p>Goal: {goal}</p>
      <button onClick={() => updateGoal(goal+1)}>Goal +</button>
      <button onClick={() => updateGoal(goal-1)}>Goal -</button>
    <h2>Errors</h2>
    <p>Add Errors like this in the console: </p>
    <p>{"store.dispatch({ type: \"ADD_ERROR\", \"payload\": \"There was an error\" });"}</p>
    <p>Click on an error to remove it</p>
    <p>TODO: form to add errors on the page instead of the console</p>
    <ul>
      {errors.map((error, i) => (<li key={i} onClick={() => onClearError(i)}>{error}</li>))}
    </ul>
  </>
  )};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
