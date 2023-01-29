const { GraphqlError } = require('graphql')
const Product = require('../../models/Product')
const Shelf = require('../../models/Shelf')
const createLog = require('../system_log_function')

module.exports = {
	Query: {
		getAllProducts: async (_, __, { req }) => {
			try {
				const allProducts = await Product.find({ active: true })
				return allProducts
			} catch (e) {
				return new GraphqlError("Ürünler getirilirken bir hata oluştu.")
			}
		},

		getProduct: async (_, { input }, { req }) => {
			try {
				const product = await Product.findOne({ _id: input?._id, active: true })
				return product
			} catch (e) {
				return new GraphqlError("Aradığınız ürün bulunamadı.")
			}
		},

		getProductsOfShelf: async (_, { input }) => {
			try {
				const products = await Product.find({ shelf_id: input?.shelf_id, active: true })
				return products
			} catch (e) {
				return new GraphqlError("Parametreler hatalı.")
			}
		},

		getProductsOfStructure: async (_, { input }, { req }) => {
			try {
				const shelfs = await Shelf.find({ active: true, structure_id: input?.structure_id })
				let products = []
				await Promise.all(shelfs.map(async (s) => {
					const productsOfShelf = await Product.find({ active: true, shelf_id: s._id.toString() })
					productsOfShelf.map((p) => {
						products.push(p)
					})
				}))
				return products
			} catch (e) {
				return new GraphqlError("Parametreler hatalı.")
			}
		}
	},

	Mutation: {
		createProduct: async (_, { input }, { req }) => {
			try {
				const shelf = await Shelf.findOne({_id: input?.shelf_id})
				const createdProduct = await Product.create({
					name: input?.name,
					arac: input?.arac,
					ozellik: input?.ozellik,
					ozellik2: input?.ozellik2,
					oem_no: input?.oem_no,
					orjinal_no: input?.orjinal_no,
					shelf_id: input?.shelf_id,
					raf_no: shelf.raf_no,
					active: true,
					created_at: new Date(),

				})
				await createLog(req.headers,"Ürün Oluşturma",createdProduct._id,createdProduct.name)
				return createdProduct
			} catch (e) {
				return new GraphqlError("Ürün oluşturulması başarısız.", "ürün oluşturalamadı")
			}
		},
		updateProduct: async (_, { input }, { req }) => {
			try {
				const shelf = await Shelf.findOne({_id: input?.shelf_id})
				const updateProduct = await Product.findOneAndUpdate({ _id: input?._id, active: true }, {
					$set: {
						name: input?.name,
						arac: input?.arac,
						ozellik: input?.ozellik,
						ozellik2: input?.ozellik2,
						oem_no: input?.oem_no,
						orjinal_no: input?.orjinal_no,
						shelf_id: input?.shelf_id,
						raf_no:shelf.raf_no,
						updated_at: new Date()
					}
				})
				
				await createLog(req.headers,"Ürün Güncelleme",updateProduct._id,updateProduct.name)

				return updateProduct
			} catch (e) {
				return new GraphqlError("Güncelleme yapılırken bir hata oldu.","Güncelleme yapılırken bir hata oldu.")
			}
		},
		deleteProduct: async (_, { input }, { req }) => {
			try {
				const deletedProduct = await Product.findOneAndUpdate({ _id: input?._id, active: true }, {
					$set: {
						active: false
					}
				})
				await createLog(req.headers,"Ürün Silme",deletedProduct._id,deletedProduct.name)

				return deletedProduct
			} catch (e) {
				return new GraphqlError("Silinemedi.", "silinemedi")
			}
		}
	}
}