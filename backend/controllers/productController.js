import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product
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
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      images: imagesUrl,
      highlights: JSON.parse(highlights),
      date: new Date(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ sucess: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

//List Product
const listProduct = async (req, res) => {};

//Delete Product
const deleteProduct = async (req, res) => {};

// Single Product Info
const singleProduct = async (req, res) => {};

export { listProduct, addProduct, deleteProduct, singleProduct };
