const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const returnBlogs = await Blog.find({});
  response.json(returnBlogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (blog.title && blog.url) {
    const savedBlog = await blog.save();
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
