const { GraphQLError } = require("graphql")
const Shelf = require("../../models/Shelf")

module.exports = {
  Query: {
    getAllShelfs: async () => {
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
    createShelf: async (_, { input }) => {
      try {
        const shelf = await Shelf.create({
          arac: input?.arac,
          raf_no: input?.raf_no,
          structure_id: input?.structure_id,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        })

        return shelf
      } catch (e) {
        return new GraphQLError('Hata oluştu. Lütfen değerlerinizi kontrol edin.')
      }
    },
    updateShelf: async (_, { input }) => {
      try {
        const shelf = await Shelf.updateOne({ _id: input?._id, active: true }, {
          $set: {
            arac: input?.arac,
            raf_no: input?.raf_no,
            structure_id: input?.structure_id,
            updated_at: new Date()
          }
        })
        return shelf
      } catch (e) {
        return new GraphQLError('Hata oluştu')
      }
    },
    deleteShelf: async (_, { input }) => {
      try {
        const shelf = await Shelf.updateOne({ _id: input._id, active: true }, { $set: { active: false, updated_at: new Date() } })
        return shelf
      } catch (e) {
        return new GraphQLError('Hata oluştu')
      }
    }
  }
}
