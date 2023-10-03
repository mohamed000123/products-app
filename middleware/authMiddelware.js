import jwt from "jsonwebtoken";

const authCheck = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "moAminSecretKey", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        // console.log(decodedToken);
        next()
      }
    });
  } else {
    res.redirect("/login");
  }
};

export default authCheck;
