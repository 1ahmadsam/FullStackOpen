const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const returnBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(returnBlogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  });

  if (blog.title && blog.url) {
    const savedBlog = await blog.save();
    //user notes array
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } else {
    return response.status(400).json({ error: 'content missing' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog);
  response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
