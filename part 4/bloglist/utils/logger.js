const info = (...message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...message);
  }
};

const error = (...error) => {
  console.error(...error);
};

module.exports = {
  info,
  error,
};
