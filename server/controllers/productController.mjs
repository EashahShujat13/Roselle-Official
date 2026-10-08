import Products from "../models/product.mjs";
import Category from "../models/category.mjs";
import cloudinary from "../config/cloudinary.mjs";


const MAX_IMAGES = 5;

// ---------- Helpers ----------

// Cloudinary URL se public_id nikalna:
// https://res.cloudinary.com/xxx/image/upload/v123/roselle-products/abc.jpg
// -> "roselle-products/abc"
const getPublicId = (url) => {
  const match = url?.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
};

// Purani images (URLs) Cloudinary se delete karna (best-effort, error nahi phenkta)
const deleteCloudinaryImages = async (urls = []) => {
  await Promise.allSettled(
    urls.map((url) => {
      const publicId = getPublicId(url);
      return publicId ? cloudinary.uploader.destroy(publicId) : null;
    })
  );
};

// Abhi upload hui files delete karna (jab request fail ho jaye)
const deleteUploadedFiles = async (files = []) => {
  await Promise.allSettled(
    files.map((file) => cloudinary.uploader.destroy(file.filename))
  );
};

// ---------- Add Product ----------
export const addProduct = async (req, res) => {
  const files = req.files || [];
  try {
    const { productName, price, stock, category, description, isFeatured } = req.body;

    // 1) Pehle category check
    const categoryExists = await Category.findOne({ categoryName: category });
    if (!categoryExists) {
      await deleteUploadedFiles(files);
      return res
        .status(400)
        .json({ message: "Invalid category. Please select an existing category." });
    }

    // 2) Phir product banao
    const product = new Products({
      productName,
      price,
      stock,
      category,
      description,
      isFeatured,
      images: files.map((file) => file.path),
    });

    await product.save();
    res.status(201).send({ message: "Product Added Successfully", product });
  } catch (e) {
    await deleteUploadedFiles(files);
    res.status(500).send({ message: e.message });
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



// ---------- Update Product ----------
export const updateProduct = async (req, res) => {
  const newFiles = req.files || [];
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      await deleteUploadedFiles(newFiles);
      return res.status(404).send({ message: "Product Not Found" });
    }

    const {
      productName,
      price,
      stock,
      category,
      description,
      isFeatured,
      existingImages,
    } = req.body;

    // 1) Category check SAVE se pehle
    if (category !== undefined) {
      const categoryExists = await Category.findOne({ categoryName: category });
      if (!categoryExists) {
        await deleteUploadedFiles(newFiles);
        return res
          .status(400)
          .json({ message: "Invalid category. Please select an existing category." });
      }
    }

    // 2) Kaun si purani images rakhni hain
    let keptImages = product.images;
    if (existingImages !== undefined) {
      let parsed;
      try {
        parsed = JSON.parse(existingImages);
      } catch {
        await deleteUploadedFiles(newFiles);
        return res.status(400).json({ message: "Invalid existingImages format" });
      }
      if (!Array.isArray(parsed)) {
        await deleteUploadedFiles(newFiles);
        return res.status(400).json({ message: "Invalid existingImages format" });
      }
      // Security: sirf wahi rakho jo is product ki pehle se thin
      keptImages = parsed.filter((url) => product.images.includes(url));
    }

    // 3) Purani (rakhi hui) + nayi images
    const finalImages = [...keptImages, ...newFiles.map((file) => file.path)];

    if (finalImages.length === 0) {
      await deleteUploadedFiles(newFiles);
      return res.status(400).json({ message: "At least one product image is required" });
    }
    if (finalImages.length > MAX_IMAGES) {
      await deleteUploadedFiles(newFiles);
      return res
        .status(400)
        .json({ message: `A product can have at most ${MAX_IMAGES} images` });
    }

    const removedImages = product.images.filter((url) => !keptImages.includes(url));

    // 4) Sirf allowed fields update karo
    if (productName !== undefined) product.productName = productName;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category !== undefined) product.category = category;
    if (description !== undefined) product.description = description;
    if (isFeatured !== undefined) product.isFeatured = isFeatured;
    product.images = finalImages;

    await product.save(); // validators automatically chalte hain

    // 5) Save kamyab hone ke baad hi purani hataayi hui images Cloudinary se delete
    await deleteCloudinaryImages(removedImages);

    res.send({ message: "Product Updated Successfully", product });
  } catch (e) {
    await deleteUploadedFiles(newFiles);
    res.status(500).send({ message: e.message });
  }
};


// ---------- Delete Product ----------
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({ message: "Product Not Found" });
    }

    // Product ki images bhi Cloudinary se hata do
    await deleteCloudinaryImages(product.images);

    res.send({ message: "Product Deleted Successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
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