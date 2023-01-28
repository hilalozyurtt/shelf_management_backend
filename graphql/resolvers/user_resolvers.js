const User = require('../../models/User');
const { ApolloError } = require("apollo-server-errors")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const createLog = require('../system_log_function')
module.exports = {
  Mutation: {

    async updateUser(_, { input }, { req }) {

      const oldUser = await User.findOne({ username: input?.username })
      let user = ""
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie)
        if (cookies.token != "") {
          user = jwt.verify(cookies.token, "UNSAFE_STRING")
        }
      }
      if (oldUser && oldUser._id != user.user_id) return new ApolloError("Bu isim kullanılmış", "Bu isim kullanılmış")
      const updatedUser = await User.findOneAndUpdate({
        _id: input._id
      }, {
        $set: {
          username: input?.username,
          usersurname: input?.usersurname,
          phone: input?.phone
        }
      })

      await createLog(req.headers, "Kullanıcı Güncelleme", updatedUser._id, updatedUser.username)
      console.log(updatedUser);
      return updatedUser
    },

    async registerUser(_, { input }, { req }) {
      const oldUser = await User.findOne({ username: input?.username })
      if (oldUser) {
        throw new ApolloError('User is already exist', 'user var')
      }
      var enPass = await bcrypt.hash(input?.password, 10)
      const newUser = new User({
        username: input?.username,
        usersurname: input?.usersurname,
        role: input?.role,
        phone: input?.phone,
        //email: input?.email.toLowerCase(),
        password: enPass
      })

      const token = jwt.sign({
        user_id: newUser._id,
        //email: newUser.email, 
        username: newUser.username,
        usersurname: newUser.usersurname,
        role: newUser.role
      }, "UNSAFE_STRING", { expiresIn: "2h" })
      newUser.token = token

      const res = await newUser.save()
      await createLog(req.headers, "Kullanıcı oluşturma", res._id, res.username)
      return {
        id: res.id,
        ...res._doc
      }
    },
    async loginUser(_, { input }, { res, req }) {
      const user = await User.findOne({ username: input?.username })
      const dogrula = await bcrypt.compare(input?.password, user.password)

      if (user && dogrula) {
        const token = jwt.sign({
          user_id: user._id,
          username: user.username,
          usersurname: user.usersurname,
          role: user.role
        }, "UNSAFE_STRING", { expiresIn: "2h" })
        await res.cookie("token", token, { httpOnly: true, secure: true })
        user.token = token

        await createLog(token, "Kullanıcı Girişi")
        return {
          id: user.id,
          ...user._doc
        }
      } else {
        throw new ApolloError('Doğrulama Başarısız Oldu', 'Doğrulama Başarısız Oldu')
      }
    },

    updatePasswordSt: async (_, { input }, { req }) => {

      const userFromDb = await User.findOne({ _id: input?._id })
      const dogrula = await bcrypt.compare(input?.password, userFromDb.password)
      if (input?.newpassword == input?.confirmPassword && dogrula) {
        const enPass = await bcrypt.hash(input?.newpassword, 10)
        const updatedUser = await User.findOneAndUpdate({ _id: input?._id }, {
          $set: {
            password: enPass
          }
        })
        return updatedUser
      } else {
        throw new ApolloError('1 doğrulama sırasında bi hata oldu', ' 1 doğrulama sırasında bi hata oldu')
      }

    },

    updatePasswordUserAD: async (_, { input }, { req }) => {
      console.log(input);
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie)
        let user;
        if (cookies.token != "") {
          user = await jwt.verify(cookies.token, "UNSAFE_STRING")
        }
        console.log(user);
        if (user?.role == 'admin') {
          const enPass = await bcrypt.hash(input?.new_password, 10)
          const updatedUser = await User.findOneAndUpdate({ _id: input?.user_id }, { $set: { password: enPass } })

          return updatedUser
        } else {
          return new ApolloError("Admin değilseniz değişiklik yapamazsınız")
        }
      } else {
        return new ApolloError("Belirtilen alan için admin girişi yapmalısınız")
      }
    },

    deleteUser: async (_, { input }, { req, res }) => {
      try{
        const user = await User.findOneAndDelete({_id: input._id})
        return user
      }catch(e){
        return new ApolloError("Kullanıcı silinirken bir hata oluştu")
      }
    },
  },

  Query: {
    getAllUsers: async (_, { input }, { req, res }) => {
      const allUsers = await User.find({})
      return allUsers
    },
    user: async (_, { input }) => await User.findById(input?._id),
    logout: async (_, __, { res, req }) => {
      await res.cookie("token", "", { httpOnly: true, secure: true })
      await createLog(req.headers, "Kullanıcı Çıkışı")
      return "logout"
    },
    checkToken: async (_, __, { res, req }) => {
      if (req && req.headers) {
        const cookies = cookie.parse(req.headers.cookie)
        const userVerify = jwt.verify(cookies.token, "UNSAFE_STRING")
        const fUser = await User.findOne({ _id: userVerify.user_id })
        if (fUser) {
          return fUser
        }
        else {
          throw new GraphQLError("bilinmeyen token")
        }
      } else {
        new GraphQLError("not auth")
      }
    }
  }
}