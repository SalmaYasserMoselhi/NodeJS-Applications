module.exports = (fn) => {
  return (req, res, next) => {
    // The catch() method is used to catch any errors that might be thrown by fn
    // If an error is thrown, it is passed to the next() function, which is typically an error handler
    fn(req, res, next).catch(next);
  };
};
