const { GraphqlError } = require('graphql')
const Product = require('../../models/Product')
const Shelf = require('../../models/Shelf')

module.exports = {
	Query: {
		getAllProducts: async () => {
			try {
				const allProducts = await Product.find({ active: true })
				return allProducts
			} catch (e) {
				return new GraphqlError("Ürünler getirilirken bir hata oluştu.")
			}
		},

		getProduct: async (_, { input }) => {
			try {
				const product = await Product.findOne({ _id: input?._id, active: true })
				return product
			} catch (e) {
				return new GraphqlError("Aradığınız ürün bulunamadı.")
			}
		},

		getProductsOfShelf: async (_, { input }) => {
			try{
				const products = await Product.find({shelf_id: input?.shelf_id, active: true})
				return products
			} catch(e) {
				return new GraphqlError("Parametreler hatalı.")
			}
		},

		getProductsOfStructure: async (_, { input }, { res }) => {
			try{
				console.log(res);
				const shelfs = await Shelf.find({ active: true, structure_id:input?.structure_id })
				let products = []
				await Promise.all(shelfs.map(async (s)=>{
					const productsOfShelf = await Product.find({ active: true, shelf_id:s._id.toString() })
					productsOfShelf.map((p)=>{
						products.push(p)
					})
				}))
				return products
			} catch(e){
				return new GraphqlError("Parametreler hatalı.")
			}
		}
	},

	Mutation: {
		createProduct: async (_, { input }) => {
			try {
				const createdProduct = await Product.create({
					name: input?.name,
					arac: input?.arac,
					ozellik: input?.ozellik,
					ozellik2: input?.ozellik2,
					oem_no: input?.oem_no,
					orjinal_no: input?.orjinal_no,
					shelf_id: input?.shelf_id,
					active: true,
					created_at: new Date(),
					updated_at: new Date()
				})
				return createdProduct
			} catch (e) {
				return new GraphqlError("Ürün oluşturulması başarısız.")
			}
		},
		updateProduct: async (_, { input }) => {
			try {
				const createdProduct = await Product.updateOne({ _id: input?._id, active: true }, {
					$set: {
						name: input?.name,
						arac: input?.arac,
						ozellik: input?.ozellik,
						ozellik2: input?.ozellik2,
						oem_no: input?.oem_no,
						orjinal_no: input?.orjinal_no,
						shelf_id: input?.shelf_id,
						updated_at: new Date()
					}
				})
				return createdProduct
			}catch(e){
				return new GraphqlError("Güncelleme olurken bir hata oldu.")
			}
		},
		deleteProduct: async (_,{ input }) => {
			try{
				const deletedProduct = await Product.updateOne({_id: input?._id, active: true},{
					$set:{
						active: false
					}
				})
				return deletedProduct
			}catch(e){
				return new GraphqlError("Silinemedi.")
			}
		}
	}
}