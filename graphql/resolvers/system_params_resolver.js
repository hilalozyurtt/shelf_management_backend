const { GraphQLError } = require("graphql")
const SystemParams = require("../../models/SystemParams")
const createLog = require('../system_log_function')

module.exports = {
  Query: {
    getAllSystemParams: async (_, {input}, {req, res}) => {
      const allSystemParams = await SystemParams.find({acitve: true})
      return allSystemParams
    },
    getSystemParams: async(_, { input }, { req, res }) => {
      console.log(input);
      const param = await SystemParams.findOne({_id: input?._id, active: true})
      return param
    },
    getSystemParamsByValue: async(_, { input }, {req, res}) => {
      const param = await SystemParams.findOne({variable: input?.variable})
      return param
    }
  },

  Mutation: {
    createSystemParams: async (_, { input }, { req, res}) => {
      const systemParams = await SystemParams.create({
        key: input?.key,
        value: input?.value,
        variable: input?.variable,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      })
      return systemParams
    },
    updateSystemParams: async(_, { input }, { req, res})=>{
      console.log(input);
      const systemParams = await SystemParams.findOneAndUpdate({_id: input?._id},{
        $set:{
          key: input?.key,
          value: input?.value,
          variable: input?.value,
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
