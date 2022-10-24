const uploader = require("../../utilities/single.uploader");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatar",
    ["image/jpg", "image/jpeg", "image/png"],
    1000000,
    "Unsupported Media Uplaoded!"
  );

  // => Error Catcher
  upload.any()(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({
        error: {
          avatars: {
            message: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
