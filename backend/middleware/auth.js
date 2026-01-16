import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(401)
      .json({ sucess: false, message: "Unauthorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_decode.id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};
export default authUser;
