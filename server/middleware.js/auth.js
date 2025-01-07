// authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = "NOTESAPI";

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      const user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
      req.email=user.email;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export default authMiddleware;
