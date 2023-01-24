const Structure = require("../../models/Structure")
const { GraphQLError } = require('graphql')
const createLog = require('../system_log_function')
module.exports = {
  Query: {
    getStructure: async (_,{ input }, {req}) => {
      try{
        const structure = await Structure.findOne({_id:input._id, active: true})
        return structure
      }catch(e){
        return new GraphQLError("İstediğiniz Bina bulunamadı")
      }
    },
    getAllStructures: async (_, { input }) => {
      try{
        const allStructure = await Structure.find({active: true})
        return allStructure
      }catch(e){
        return new GraphQLError("Binalar getirilemedi")
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
        await createLog(req.headers,"Bina Oluşturma",createdStructure._id,createdStructure.bina_no)
        return createdStructure
      }catch(e){
        return new GraphQLError("Bina oluşturması başarısız. Lütfen doğru bilgileri girdiğinizden emin olun.")
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
        await createLog(req.headers,"Bina Güncelleme",updatedStructure._id,updatedStructure.bina_no)
        return updatedStructure
      }catch(e){
        return new GraphQLError("Güncelleme başarısız. Lütfen bilgileri kontrol ediniz.")
      }
    },
    deleteStructure: async (_, { input }, { req }) => {
      try{
        const deletedStructure = await Structure.findOneAndUpdate(
          {_id:input._id, active: true},
          {$set:{
            active: false,
            updated_at: new Date()
          }}
        )
        await createLog(req.headers,"Bina Silme",deletedStructure._id,deletedStructure.bina_no)
        return deletedStructure
      }catch(e){
        return new GraphQLError("Silme başarısız oldu.")
      }
    }
  }
}