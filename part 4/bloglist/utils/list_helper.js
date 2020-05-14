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
  return blogs.length === 0 ? blogs : blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  return _.head(_(blogs.author).countBy().entries().maxBy(_.last));
};
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
