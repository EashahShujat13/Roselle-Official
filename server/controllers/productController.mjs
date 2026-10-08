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