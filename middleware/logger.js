const Logger = (req, res, next) => {
  console.log(`The API has a new ${req.method} request for URL: ${req.url}`);
  next();
};
module.exports = Logger;
