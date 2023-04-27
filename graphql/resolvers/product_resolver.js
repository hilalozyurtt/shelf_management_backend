const { GraphqlError } = require('graphql')
const Product = require('../../models/Product')
const Shelf = require('../../models/Shelf')
const createLog = require('../system_log_function')
const Structure = require('../../models/Structure')

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
				const shelf = await Shelf.findOne({_id: input?.shelf_id, active: true})
				const structure = await Structure.findOne({_id: shelf.structure_id, active: true})
				const createdProduct = await Product.create({
					name: input?.name,
					arac: input?.arac,
					ozellik: input?.ozellik,
					ozellik2: input?.ozellik2,
					oem_no: input?.oem_no,
					orjinal_no: input?.orjinal_no,
					shelf_id: input?.shelf_id,
					structure_id: structure._id,
					bina_no: structure.bina_no,
					raf_no: shelf.raf_no,
					stock: input?.stock,
					active: true,
					created_at: new Date(),
					updated_at: new Date()

				})
				await createLog(req.headers,"Ürün Oluşturma",createdProduct._id,createdProduct.name)
				return createdProduct
			} catch (e) {
				return new GraphqlError("Ürün oluşturulması başarısız.", "ürün oluşturalamadı")
			}
		},
		updateProduct: async (_, { input }, { req }) => {
			try {
				const shelf = await Shelf.findOne({_id: input?.shelf_id, active: true})
				const structure = await Structure.findOne({_id: shelf.structure_id, active: true})
				const updateProduct = await Product.updateOne({ _id: input?._id, active: true }, {
					$set: {
						name: input?.name,
						arac: input?.arac,
						ozellik: input?.ozellik,
						ozellik2: input?.ozellik2,
						oem_no: input?.oem_no,
						orjinal_no: input?.orjinal_no,
						shelf_id: input?.shelf_id,
						raf_no:shelf.raf_no,
						structure_id: structure._id,
						bina_no: structure.bina_no,
						stock: input?.stock,
						updated_at: new Date()
					}
				})

				if(updateProduct.modifiedCount > 0){
					const product = await Product.findOne({_id: input?._id})
					await createLog(req.headers,"Ürün Güncelleme",product._id,product.name)
					return product
				}else{
					throw new Error("Ürün güncellenemedi")
				}
			} catch (e) {
				return new GraphqlError("Güncelleme yapılırken bir hata oldu.","Güncelleme yapılırken bir hata oldu.")
			}
		},
		decStockOfProduct: async (_, { input }, { req }) => {
			try {
				const product = await Product.findOne({_id: input?._id, active: true})
				if(product?.stock === 0 || product?.stock < 1){
					throw new Error("Ürün stoğu sıfır daha fazla düşemez! " + e)
				}else {
					const updateProduct = await Product.updateOne({ _id: input?._id, active: true }, {
						$inc: {
							stock: -1
						}
					})
	
					if(updateProduct.modifiedCount > 0){
						await createLog(req.headers,"Ürün Stok Düşme",product._id,product.name)
						return product
					} else {
						throw new Error("Stok sıfırdan düşük olamaz veya bir hata oluştu.")
					}
				}

			} catch (e) {
				return new GraphqlError("Silinemedi.", "silinemedi")
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