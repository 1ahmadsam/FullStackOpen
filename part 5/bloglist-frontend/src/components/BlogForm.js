import React, { useState } from 'react';
import PropTypes from 'prop-types';
const BlogForm = ({ createBlog, setSuccessMessage, setErrorMessage }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      createBlog({
        title,
        author,
        url,
      });
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      setErrorMessage('Fill out the fields');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  };
  return (
    <React.Fragment>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-blog' type='submit'>
          create
        </button>
      </form>
    </React.Fragment>
  );
};

export default BlogForm;
