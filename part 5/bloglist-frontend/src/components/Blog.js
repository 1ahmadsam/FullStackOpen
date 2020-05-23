import React, { useState } from 'react';
const Blog = ({ blog, blogService }) => {
  const [showFullBlog, setShowFullBlog] = useState(false);

  const hideWhenVisible = { display: showFullBlog ? 'none' : '' };
  const showWhenVisible = { display: showFullBlog ? '' : 'none' };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleLike = async (event) => {
    event.preventDefault();
    try {
      //blogService.setToken(user.token);
      const currentBlog = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : null,
      });

      // setSuccessMessage(`a new blog ${title} by ${author} added`);
      // setTimeout(() => {
      //   setSuccessMessage(null);
      // }, 5000);
    } catch (exception) {
      // setErrorMessage('Fill out the fields');
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
      console.log(exception);
    }
  };
  const viewButton = () => {
    if (showFullBlog) {
      return <button onClick={() => setShowFullBlog(false)}>hide</button>;
    } else {
      return <button onClick={() => setShowFullBlog(true)}>view</button>;
    }
  };
  return (
    <div style={blogStyle}>
      <div style={{ display: 'inline-block' }}>
        {blog.title} {blog.author} {viewButton()}
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.user ? blog.user.name : null}
      </div>
    </div>
  );
};

export default Blog;
