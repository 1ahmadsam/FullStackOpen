import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    //
    dispatch(createNotification(`added ${content} as anecdote`, 5));
  };
  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </React.Fragment>
  );
};

export default AnecdoteForm;
