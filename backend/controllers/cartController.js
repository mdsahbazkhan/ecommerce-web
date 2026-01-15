import User from "../models/userModel.js";
//Add products to user Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size } = req.body;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update user Cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quality } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quality;
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: false, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get user Cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: false, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
