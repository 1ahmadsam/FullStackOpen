import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';
import Notification from './Notification';
import Filter from './Filter';

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdote);
  const new_filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteFor(anecdote));
    dispatch(createNotification(`you voted '${anecdote.content}'`, 10));
  };
  // sort anecdotes by most votes
  let anecdotes_sorted = anecdotes.sort(function (a, b) {
    if (a.votes > b.votes) {
      return -1;
    }
    if (a.votes < b.votes) {
      return 1;
    }
    return 0;
  });
  // filter anecdotes if filter exists
  anecdotes_sorted = new_filter
    ? anecdotes_sorted.filter((anecdote) =>
        anecdote.content.includes(new_filter)
      )
    : anecdotes_sorted;

  return (
    <React.Fragment>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {anecdotes_sorted.map((anecdote) => (
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
export default AnecdoteList;
