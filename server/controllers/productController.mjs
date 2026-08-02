import Products from "../models/product.mjs";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const product = new Products(req.body);

    await product.save();

    res.status(201).send({
      message: "Product Added Successfully",
      product,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.send({
      message: "Products Fetched Successfully",
      products,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};



// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).send({
        message: "Product Not Found",
      });
    }

    res.send({
      message: "Product Updated Successfully",
      product,
    });

  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {

    const product = await Products.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).send({
        message: "Product Not Found",
      });
    }

    res.send({
      message: "Product Deleted Successfully",
    });

  } catch (e) {

    res.status(500).send({
      message: e.message,
    });

  }
};

// Search Products
export const searchProducts = async (req, res) => {
  try {

    const { keyword } = req.query;

    const products = await Products.find({
      productName: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.send({
      message: "Search Results",
      products,
    });

  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};
// feature product
export const getFeaturedProducts = async (req, res) => {
  try {

    const products = await Products.find({
      isFeatured: true,
    })
      .sort({
        createdAt: -1,
      })
      .limit(4);

    res.status(200).json({
      message: "Featured Products Fetched Successfully",
      products,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// method no 01

export const getSingleProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      message: "Product Fetched Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// method 02

// Get Single Product
// export const getSingleProduct = async (req, res) => {
//   try {
//     const product = await Products.findById(req.params.id);

//     if (!product) {
//       return res.status(404).send({
//         message: "Product Not Found",
//       });
//     }

//     res.send({
//       message: "Product Found",
//       product,
//     });
//   } catch (e) {
//     res.status(500).send({
//       message: e.message,
//     });
//   }
// };