import React, { useState } from 'react';
const BlogForm = ({ blogService, setSuccessMessage, setErrorMessage }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      //blogService.setToken(user.token);
      const newBlog = await blogService.create({
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
      console.log(title, url, author);
    } catch (exception) {
      setErrorMessage('Fill out the fields');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <React.Fragment>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </React.Fragment>
  );
};

export default BlogForm;
