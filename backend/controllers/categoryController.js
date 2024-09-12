import asyncHandler from '../middlewares/asyncHandler.js'
import Category from '../models/categoryModel.js'

export const getCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).send(categories)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    res.status(200).send(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.json({ error: 'Name is required' })
    }
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res.json({ error: 'Category already exist' })
    }
    const category = await new Category({ name }).save()
    res.json(category)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body
    console.log(req.body)

    const { categoryId } = req.params
    const category = await Category.findOne({ _id: categoryId })
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    category.name = name
    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params
    console.log(categoryId)
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).send({ error: 'Category not found' })
    }
    await Category.findByIdAndDelete(categoryId)
    res.status(200).json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
