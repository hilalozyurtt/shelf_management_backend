const { GraphQLError } = require("graphql")
const Shelf = require("../../models/Shelf")
const Structure = require("../../models/Structure")
const Product = require("../../models/Product")
const createLog = require('../system_log_function')

module.exports = {
  Query: {
    getAllShelfs: async (_, __, {req}) => {
      try {
        const allShelfs = await Shelf.find({ active: true })
        return allShelfs
      } catch (e) {
        return new GraphQLError('Hata oluştu')
      }

    },
    getShelf: async (_, { input }) => {
      try {
        const shelf = await Shelf.findOne({ _id: input._id, active: true })
        return shelf
      } catch (e) {
        return new GraphQLError('Hata oluştu. Lütfen değerlerinizi kontrol edin.')
      }
    }
  },

  Mutation: {
    createShelf: async (_, { input }, { req }) => {
      try {
        const bina = await Structure.findOne({_id:input?.structure_id})
        const shelf = await Shelf.create({
          arac: input?.arac,
          raf_no: input?.raf_no,
          structure_id: input?.structure_id,
          bina_no: bina.bina_no,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        })

        await createLog(req.headers,"Raf Oluşturma",shelf._id,shelf.raf_no)

        return shelf
      } catch (e) {
        return new GraphQLError('Hata oluştu. Lütfen değerlerinizi kontrol edin.')
      }
    },
    updateShelf: async (_, { input }, { req }) => {
      try {
        const bina = await Structure.findOne({_id:input?.structure_id})
        const shelf = await Shelf.findOneAndUpdate({ _id: input?._id, active: true }, {
          $set: {
            arac: input?.arac,
            raf_no: input?.raf_no,
            bina_no: bina.bina_no,
            structure_id: input?.structure_id,
            updated_at: new Date()
          }
        })
        await Product.updateMany({active: true, shelf_id:input?._id}, {$set:{raf_no: input?.raf_no, structure_id: input?.structure_id, bina_no: bina.bina_no}})
        await Product.updateMany({active: true, shelf_id:input?._id}, {$set:{raf_no: input?.raf_no}})
        await createLog(req.headers,"Raf Güncelleme",shelf._id,shelf.raf_no)
        return shelf
      } catch (e) {
        return new GraphQLError('Hata oluştu')
      }
    },
    deleteShelf: async (_, { input }, { req }) => {
      try {
        const shelf = await Shelf.findOneAndUpdate({ _id: input._id, active: true }, { $set: { active: false, updated_at: new Date() } })
        await createLog(req.headers,"Raf Silme",shelf._id,shelf.raf_no)

        return shelf
      } catch (e) {
        return new GraphQLError('Hata oluştu')
      }
    }
  }
}
