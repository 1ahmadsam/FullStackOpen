import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';
import Notification from './Notification';
import Filter from './Filter';

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  // const anecdotes = useSelector((state) => state.anecdote);
  // const new_filter = useSelector((state) => state.filter);

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteFor(anecdote));
    dispatch(createNotification(`you voted '${anecdote.content}'`, 10));
  };
  const anecdotesToShow = () => {
    let anecdotes_sorted = props.anecdotes.sort(function (a, b) {
      if (a.votes > b.votes) {
        return -1;
      }
      if (a.votes < b.votes) {
        return 1;
      }
      return 0;
    });
    console.log(props.anecdote);
    return props.filter
      ? anecdotes_sorted.filter((anecdote) =>
          anecdote.content.includes(props.filter)
        )
      : anecdotes_sorted;
  };

  // sort anecdotes by most votes

  // filter anecdotes if filter exists

  return (
    <React.Fragment>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {anecdotesToShow().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state);
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};
const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList);
export default ConnectedAnecdotes;
