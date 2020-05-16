const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  if (blog.title && blog.url) {
    blog.save().then((result) => {
      response.status(201).json(result);
    });
  } else {
    return response.status(400).json({ error: 'content missing' });
  }
});

module.exports = blogsRouter;
