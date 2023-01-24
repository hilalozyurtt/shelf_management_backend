const SystemLog = require("../../models/System_log")
const { GraphQLError } = require('graphql')

module.exports = {
  Query: {
    getSystemLog: async (_,{ input }) => {
      try{
        const systemLog = await SystemLog.findOne({_id:input._id})
        return systemLog
      }catch(e){
        return new GraphQLError("İstediğiniz Kayıt bulunamadı", "İstediğiniz Kayıt bulunamadı")
      }
    },
    getAllSystemLogs: async (_, { input }) => {
      try{
        const allSystemLog = await SystemLog.find()
        return allSystemLog
      }catch(e){
        return new GraphQLError("Kayıtlar getirilemedi", "Kayıtlar getirilemedi")
      }
    }
  }
}