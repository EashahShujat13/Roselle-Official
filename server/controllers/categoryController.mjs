import Category from "../models/category.mjs";


export const addCategory = async (req, res) => {

  try {

    const { categoryName } = req.body;

    const category = new Category({ categoryName, });

    await category.save();

    res.status(201).json({
      message: "Category Added Successfully",

      category,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }
};

export const getAllCategories =async(req,res)=>{
    try{
    const categories = await Category.find();
    res.status(200).json({
        message:"Categories Fetched Seccessfully",
        categories,
    });
}catch(error){
    res.status(500).json({
        message: error.message,
    });
}
}

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

export const updateCategory = async(req, res)=>{
    try{
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate( 
            id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true,
        });

        if(!category){
            return res.status(404).json({
                message:"Category Not Found",
            });
    
        }
        res.status(200).json({
            message:"Category Updated Successfully",
            category,
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
      
}

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