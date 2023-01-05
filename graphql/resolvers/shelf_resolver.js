const Shelf = require("../../models/Shelf")

module.exports = {
  Query: {
    getAllShelfs: async () => {
      const allShelfs = await Shelf.find({active: true})
      return allShelfs
    },
    getShelf: async (_,{input}) => {
      const shelf = await Shelf.findOne({_id:input._id, active:true})
      return shelf
    }
  },

  Mutation: {
    createShelf: async (_,{input}) => {
      const shelf = await Shelf.create({
        arac: input?.arac,
        ozellik: input?.ozellik,
        ozellik2: input?.ozellik2,
        oem_no: input?.oem_no,
        orjinal_no: input?.orjinal_no,
        raf_no: input?.raf_no,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      })

      return shelf
    },
    updateShelf: async (_,{input}) => {
      const shelf = await Shelf.updateOne({_id: input?._id, active: true}, {$set:{
        arac: input?.arac,
        ozellik: input?.ozellik,
        ozellik2: input?.ozellik2,
        oem_no: input?.oem_no,
        orjinal_no: input?.orjinal_no,
        raf_no: input?.raf_no,
        updated_at: new Date()
      }})
      return shelf
    },
    deleteShelf: async (_,{ input }) => {
      const shelf = await Shelf.updateOne({_id:input._id, active: true}, {$set:{active: false}})
      return shelf
    }
  }
}