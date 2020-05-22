import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => {
    const addBlog = async (event) => {
      event.preventDefault();
      try {
        blogService.setToken(user.token);
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={errorMessage} messageGood={false} />
        <Notification message={successMessage} messageGood={true} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} messageGood={false} />
      <Notification message={successMessage} messageGood={true} />
      <p>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            setUser(null);
            window.localStorage.removeItem('loggedBlogappUser');
          }}
        >
          logout
        </button>
      </p>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
