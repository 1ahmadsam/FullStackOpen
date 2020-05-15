const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const reducer = (prev, currentValue) => {
    if (prev.likes > currentValue.likes) {
      return prev;
    } else {
      return currentValue;
    }
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  const result = _(_.map(blogs, 'author')).countBy().entries().maxBy(_.last);

  return blogs.length === 0 ? 0 : { author: result[0], blogs: result[1] };
};

const mostLikes = (blogs) => {
  const arr1 = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();

  author = _.maxBy(arr1, 'likes');
  return blogs.length === 0 ? 0 : author;
};
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
