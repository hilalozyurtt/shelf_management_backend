const Structure = require("../../models/Structure")
const Shelf = require("../../models/Shelf")
const { GraphQLError } = require('graphql')
const createLog = require('../system_log_function')
module.exports = {
  Query: {
    getStructure: async (_,{ input }, {req}) => {
      try{
        const structure = await Structure.findOne({_id:input._id, active: true})
        return structure
      }catch(e){
        return new GraphQLError("İstediğiniz Depo bulunamadı")
      }
    },
    getAllStructures: async (_, { input }) => {
      try{
        const allStructure = await Structure.find({active: true})
        return allStructure
      }catch(e){
        return new GraphQLError("Depolar getirilemedi")
      }
    }
  },

  Mutation: {
    createStructure: async (_, { input }, { req }) => {
      try{
        const createdStructure = await Structure.create({
          bina_no: input?.bina_no,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        })
        await createLog(req.headers,"Depo Oluşturma",createdStructure._id,createdStructure.bina_no)
        return createdStructure
      }catch(e){
        return new GraphQLError("Depo oluşturması başarısız. Lütfen doğru bilgileri girdiğinizden emin olun.")
      }
    },
    updateStructure: async (_, { input }, { req }) => {
      try{
        const updatedStructure = await Structure.findOneAndUpdate(
          {_id: input?._id, active: true},
          {$set:
            {
              bina_no: input?.bina_no, updated_at: new Date()
            }
          }
        )
        await Shelf.updateMany({active: true, structure_id: input?._id}, {$set:{bina_no:input?.bina_no}})

        await createLog(req.headers,"Depo Güncelleme",updatedStructure._id,updatedStructure.bina_no)
        return updatedStructure
      }catch(e){
        return new GraphQLError("Güncelleme başarısız. Lütfen bilgileri kontrol ediniz.")
      }
    },
    deleteStructure: async (_, { input }, { req }) => {
      try{
        const deletedStructure = await Structure.deleteOne(
          {_id:input._id},
        )
        await createLog(req.headers,"Depo Silme",deletedStructure._id,deletedStructure.bina_no)
        return deletedStructure
      }catch(e){
        return new GraphQLError("Silme başarısız oldu.")
      }
    }
  }
}