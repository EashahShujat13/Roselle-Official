import Category from "../models/category.mjs";
import Products from "../models/product.mjs";

export const addCategory = async (req, res) => {
  try {
    const { categoryName, image } = req.body;

    if (!categoryName?.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = new Category({ categoryName, image });
    await category.save();

    res.status(201).json({ message: "Category Added Successfully", category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).lean();

    // Dynamic product count per category
    const withCounts = await Promise.all(
      categories.map(async (cat) => ({
        ...cat,
        productCount: await Products.countDocuments({ category: cat.categoryName }),
      }))
    );

    res.status(200).json({
      message: "Categories Fetched Successfully",
      categories: withCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSingleCategory = async(req, res)=>{
    try{
        const{ id }=req.params;
        const category = await Category.findById(id);
        if(!category){
           return  res.status(404).json({
                message:" Category Not Found",
            })
        }
        res.status(200).json({
                message:"Category Fetched Successfully",
                category,
            })
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
}


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, image } = req.body; // whitelist, don't pass req.body directly

    const existing = await Category.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    const oldName = existing.categoryName;

    if (categoryName !== undefined) existing.categoryName = categoryName;
    if (image !== undefined) existing.image = image;
    await existing.save(); // runs validators

    // Keep products linked if the category was renamed
    if (categoryName && categoryName.trim() !== oldName) {
      await Products.updateMany(
        { category: oldName },
        { $set: { category: existing.categoryName } }
      );
    }

    res.status(200).json({
      message: "Category Updated Successfully",
      category: existing,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async(req, res)=>{
    try{
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({
                message:"Category Not Found",
            });
        }
        res.status(200).json({
            message:"Category Deleted Successfully",
            category,
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getProductsByCategory = async(req, res)=>{
    try{
    const { category } = req.params;
    const products = await Products.find({ category });
    res.status(200).json({
        message:"Products Fetched Successfully",
        products,
    })
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}