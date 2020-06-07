import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import Notification from './Notification';

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdote);
  const dispatch = useDispatch();
  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteFor(id));
  };

  let anecdotes_sorted = anecdotes.sort(function (a, b) {
    if (a.votes > b.votes) {
      return -1;
    }
    if (a.votes < b.votes) {
      return 1;
    }
    return 0;
  });

  return (
    <React.Fragment>
      <h2>Anecdotes</h2>
      <Notification />
      {anecdotes_sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
export default AnecdoteList;
