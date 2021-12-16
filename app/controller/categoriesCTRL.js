const Categories = require('../model/category');



const categoriesCTRL = {
    getAllCategories: async (req, res) => {
        try {
            const allCategories = await Categories.find().sort({ createdAt: -1 })
            res.json({
                allCategories,
                result: allCategories.length
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const newCategory = await Categories({
                name
            })
            newCategory.save();
            res.json({ msg: "دسته بندی مورد نظر ساخته شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            await Categories.findOneAndRemove(id)
            res.json({ msg: "دسته بندی مورد نظر حذف شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Categories.findByIdAndUpdate({ _id: req.params.id }, { name })
            res.json({ msg: "دسته بندی مورد نظر بروز رسانی شد" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },



}




module.exports = categoriesCTRL;