const { GraphqlError } = require('graphql')
const Product = require('../../models/Product')

module.exports = {
    Query: {
        getAllProduct: async ()=>{
            const allProducts = await Product.find()
            return allProducts
        }
    },

    Mutation: {
        createProduct: async (_, {input}) => {
            const createdProduct = await Product.create({name:input.name, created_at: new Date(Date.now()).toUTCString(), updated_at:new Date(Date.now()).toUTCString()})
            console.log(input.name)
            return createdProduct
        }
    }
}