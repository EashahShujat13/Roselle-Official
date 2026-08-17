import Wishlist from "../models/wishlist.mjs";
import Products from "../models/product.mjs";

/*
  GET MY WISHLIST
*/
export const getMyWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user: req.userId,
    }).populate({
      path: "products",
      select: "-__v",
    });

    if (!wishlist) {
      wishlist = {
        products: [],
      };
    }

    res.status(200).json({
      message: "Wishlist Fetched Successfully",
      wishlist: {
        products: wishlist.products || [],
      },
    });
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  ADD PRODUCT TO WISHLIST
*/
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    let wishlist = await Wishlist.findOne({
      user: req.userId,
    });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.userId,
        products: [productId],
      });

      await wishlist.save();
    } else {
      const alreadyExists = wishlist.products.some(
        (id) => id.toString() === productId.toString()
      );

      if (alreadyExists) {
        return res.status(200).json({
          message: "Product Already In Wishlist",
          wishlist,
        });
      }

      wishlist.products.push(productId);

      await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findOne({
      user: req.userId,
    }).populate("products");

    res.status(200).json({
      message: "Product Added To Wishlist Successfully",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error("ADD WISHLIST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  REMOVE PRODUCT FROM WISHLIST
*/
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist Not Found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId.toString()
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({
      user: req.userId,
    }).populate("products");

    res.status(200).json({
      message: "Product Removed From Wishlist Successfully",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error("REMOVE WISHLIST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
  CLEAR WISHLIST
*/
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.userId,
    });

    if (!wishlist) {
      return res.status(200).json({
        message: "Wishlist Already Empty",
        wishlist: {
          products: [],
        },
      });
    }

    wishlist.products = [];

    await wishlist.save();

    res.status(200).json({
      message: "Wishlist Cleared Successfully",
      wishlist: {
        products: [],
      },
    });
  } catch (error) {
    console.error("CLEAR WISHLIST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};