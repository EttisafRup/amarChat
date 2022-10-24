const createError = require("http-errors");

const notFoundErrorHandler = (req, res, next) => {
  next(createError(404, "Your requested route was not found!"));
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("errors/error", {
      title: "an error Occured!",
      error: err,
    });
  } else {
    console.log(err);
    res.json({
      state: "Failed!",
      error: res.locals.error.error,
    });
  }
};

module.exports = {
  notFoundErrorHandler,
  errorHandler,
};
