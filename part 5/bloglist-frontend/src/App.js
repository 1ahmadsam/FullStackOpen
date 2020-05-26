import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogFormVisible, setBlogFormVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);

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

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject);
    console.log(newBlog);
    setBlogs(blogs.concat(newBlog));
  };
  const updateLikes = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject);
    const newArr = blogs.filter((blog) => blog.id !== id);
    setBlogs(newArr.concat(updatedBlog));
  };
  const deleteBlog = async (id) => {};

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            createBlog={addBlog}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };
  const sortedBlog = () => {
    const sortedBlog = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    return sortedBlog.map((blog) => (
      <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />
    ));
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
      {sortedBlog()}
    </div>
  );
};

export default App;
