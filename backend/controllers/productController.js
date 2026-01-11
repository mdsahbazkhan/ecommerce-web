import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product
// const addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       price,
//       description,
//       category,
//       subCategory,
//       sizes,
//       bestseller,
//       highlights,
//     } = req.body;
//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];
//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );
//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });
//         return result.secure_url;
//       })
//     );
//     const productData = {
//       name,
//       price: Number(price),
//       description,
//       category,
//       subCategory,
//       sizes: JSON.parse(sizes),
//       bestseller: bestseller === "true" ? true : false,
//       images: imagesUrl,
//       highlights: JSON.parse(highlights),
//       date: new Date(),
//     };
//     console.log(productData);
//     const product = new productModel(productData);
//     await product.save();

//     res.json({ sucess: true, message: "Product Added Successfully" });
//   } catch (error) {
//     console.log(error);
//     res.json({ sucess: false, message: error.message });
//   }
// };
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
      highlights,
    } = req.body;

    // ---------- BASIC VALIDATION ----------
    if (!name || name.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Product name must be at least 5 characters",
      });
    }

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Product description must be at least 10 characters",
      });
    }

    if (!price || Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid product price is required",
      });
    }

    if (!category || !subCategory) {
      return res.status(400).json({
        success: false,
        message: "Product category and sub-category are required",
      });
    }

    // ---------- PARSE & VALIDATE ARRAYS ----------
    let parsedSizes;
    let parsedHighlights;

    try {
      parsedSizes = JSON.parse(sizes);
      parsedHighlights = JSON.parse(highlights);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid sizes or highlights format",
      });
    }

    if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Select at least one product size",
      });
    }

    if (!Array.isArray(parsedHighlights) || parsedHighlights.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Add at least 2 product highlights",
      });
    }

    // ---------- IMAGE VALIDATION ----------
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    // ---------- UPLOAD TO CLOUDINARY ----------
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // ---------- FINAL PRODUCT DATA ----------
    const productData = {
      name: name.trim(),
      price: Number(price),
      description: description.trim(),
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true",
      images: imagesUrl,
      highlights: parsedHighlights,
      date: new Date(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};

//List Product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

// Single Product Info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

export { listProduct, addProduct, deleteProduct, singleProduct };
