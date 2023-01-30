const { GraphQLError } = require("graphql")
const SystemParams = require("../../models/SystemParams")
const createLog = require('../system_log_function')

module.exports = {
  Query: {
    getAllSystemParams: async (_, {input}, {req, res}) => {
      const allSystemParams = await SystemParams.find({active: true})
      return allSystemParams
    },
    getSystemParams: async(_, { input }, { req, res }) => {
      const param = await SystemParams.findOne({_id: input?._id, active: true})
      return param
    },
    getSystemParamsByValue: async(_, { input }, {req, res}) => {
      const param = await SystemParams.findOne({variable: input?.variable})
      return param
    },
    getSystemParamsByTable: async(_, { input }, { req, res }) => {
      try{
        const params = await SystemParams.find({active: true, value:false, table:input?.table})
        return params
      }catch(e){
        throw new GraphQLError("İstek işlenirken bir hata oluştu!", "İstek işlenirken bir hata oluştu!")
      }
    }
  },

  Mutation: {
    createSystemParams: async (_, { input }, { req, res}) => {
      const systemParams = await SystemParams.create({
        key: input?.key,
        value: input?.value,
        variable: input?.variable,
        table: input?.table,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      })
      return systemParams
    },
    updateSystemParams: async(_, { input }, { req, res})=>{
      const systemParams = await SystemParams.findOneAndUpdate({_id: input?._id},{
        $set:{
          key: input?.key,
          value: input?.value,
          table: input?.table,
          variable: input?.variable,
          updated_at: new Date()
        }
      })
      return systemParams
    },
    deleteSystemParams: async(_, { input }, { req, res})=>{
      const systemParams = await SystemParams.findOneAndUpdate({_id: input?._id},{
        $set:{
          active:false
        }
      })
      return systemParams
    },
  }
}
