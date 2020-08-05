import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [published, setPublished] = useState('');

  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }
  //if api call isn't recieved yet
  if (result.loading) {
    return <div>loading</div>;
  }

  const submit = async (event) => {
    event.preventDefault();
    const publishedDate = parseInt(published);
    const editBook = {
      variables: { name, setBornTo: publishedDate },
    };
    changeAuthor(editBook);
    console.log('clicked');
  };

  const authors = result.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <button type='submit'>update Author</button>
      </form>
    </div>
  );
};

export default Authors;
