const Structure = require("../../models/Structure")
const { GraphQLError } = require('graphql')

module.exports = {
  Query: {
    getStructure: async (_,{ input }) => {
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
    createStructure: async (_, { input }) => {
      try{
        const createdStructure = await Structure.create({
          bina_no: input?.bina_no,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        })
        return createdStructure
      }catch(e){
        return new GraphQLError("Bina oluşturması başarısız. Lütfen doğru bilgileri girdiğinizden emin olun.")
      }
    },
    updateStructure: async (_, { input }) => {
      try{
        const updatedStructure = await Structure.findOneAndUpdate(
          {_id: input?._id, active: true},
          {$set:
            {
              bina_no: input?.bina_no, updated_at: new Date()
            }
          }
        )
        return updatedStructure
      }catch(e){
        return new GraphQLError("Güncelleme başarısız. Lütfen bilgileri kontrol ediniz.")
      }
    },
    deleteStructure: async (_, { input }) => {
      try{
        const deletedStructure = await Structure.findOneAndUpdate(
          {_id:input._id, active: true},
          {$set:{
            active: false,
            updated_at: new Date()
          }}
        )
        return deletedStructure
      }catch(e){
        return new GraphQLError("Silme başarısız oldu.")
      }
    }
  }
}