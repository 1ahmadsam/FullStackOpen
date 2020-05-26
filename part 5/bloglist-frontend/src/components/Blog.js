import React, { useState } from 'react';
const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showFullBlog, setShowFullBlog] = useState(false);
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
      updateLikes(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user : null,
      });
    } catch (exception) {
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
  const handleDelete = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog : ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlog(blog.id);
      } catch (exception) {
        console.log(exception);
      }
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
        <br />
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
