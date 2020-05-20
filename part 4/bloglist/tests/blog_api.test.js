const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blog has proper id property', async () => {
  const response = await api.get('/api/blogs');
  const contents = response.body.map((r) => r.id);
  console.log(contents);
  contents.forEach((blog) => expect(blog).toBeDefined());
});

test('a valid blog can be added', async () => {
  const newBlog = {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  };
  await api
    .post('/api/blogs')
    .set(
      'Authorization',
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhbWkwNyIsImlkIjoiNWVjMjUxYmM0ZTVmOGQ0YjdjZTg0ZWYyIiwiaWF0IjoxNTg5OTY4OTc4fQ.Gabl8jpGMRvguAy4Ngsn66U057sWX9arM9hOHKTVwwg'
    )
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  //check if blog is added to
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((b) => b.title);
  expect(contents).toContain('TDD harms architecture');
});

test('blog does not have likes property', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  };
  const resultBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  expect(resultBlog.body.likes).toEqual(0);
});

test('blog does not have title and url property', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
