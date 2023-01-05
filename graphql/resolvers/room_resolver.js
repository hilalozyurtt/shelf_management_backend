const Room = require("../../models/Room")
import { GraphQLError } from 'graphql';

module.exports = {
  Query: {
    getRoom: async (_,{ input }) => {
      try{
        const Room = await Room.findOne({_id:input._id, active: true})
        return Room
      }catch(e){
        return new GraphQLError("İstediğiniz Oda bulunamadı")
      }
    },
    getAllRoom: async (_, { input }) => {
      try{
        const allRoom = await Room.find({active: true})
        return allRoom
      }catch(e){
        return new GraphQLError("Odalar getirilemedi")
      }
    }
  },

  Mutation: {
    createRoom: async (_, { input }) => {
      try{
        const createdRoom = await Room.create({
          oda_no: input?.oda_no,
          structure_id: input?.structure_id,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        })
        return createdRoom
      }catch(e){
        return new GraphQLError("Oda oluşturması başarısız. Lütfen doğru bilgileri girdiğinizden emin olun.")
      }
    },
    updateRoom: async (_, { input }) => {
      try{
        const updatedRoom = await Room.findOneAndUpdate(
          {_id: input?._id, active: true},
          {$set:
            {
              oda_no: input?.oda_no,
              structure_id: input?.structure_id,
              updated_at: new Date()
            }
          }
        )
        return updatedRoom
      }catch(e){
        return new GraphQLError("Güncelleme başarısız. Lütfen bilgileri kontrol ediniz.")
      }
    },
    deleteRoom: async (_, { input }) => {
      try{
        const deletedRoom = await Room.findOneAndUpdate(
          {_id:input._id, active: true},
          {$set:{
            active: false,
            updated_at: new Date()
          }}
        )
        return deletedRoom
      }catch(e){
        return new GraphQLError("Silme başarısız oldu.")
      }
    }
  }
}