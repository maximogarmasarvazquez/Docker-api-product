import {
  getAllProductsModel,
  createProductModel,
  deletedProductModel,
  getProductByIdModel,
  updateProductModel,
  updatePartialProductModel
} from '../models/product.model.js';

export const getAllProducts = async () => {
  return await getAllProductsModel();
};

export const createProduct = async (product) => {
  return await createProductModel(product);
}

export const deletedProduct = async (product) => {
  return await deletedProductModel(product);
}

export const getProductById = async (id) => {
  return await getProductByIdModel(id);
}

export const updateProduct = async (id, product) => {
  return await updateProductModel(id, product);
}

export const updatePartialProduct = async (id, product) => {
  return await updatePartialProductModel(id, product);
} 