import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized Login Again" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // The token is created as jwt.sign(email + password, ...)
    // So tokenDecode is a string (email+password concatenation)
    const expectedAdmin =
      (process.env.ADMIN_EMAIL || "") + (process.env.ADMIN_PASSWORD || "");

    if (tokenDecode !== expectedAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized Login Again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default adminAuth;
