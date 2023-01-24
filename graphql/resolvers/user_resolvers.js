const User = require('../../models/User');
const { ApolloError } = require("apollo-server-errors")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

module.exports = {
    Mutation: {
        async registerUser(_, {input} ) {
            const oldUser = await User.findOne({email: input?.email})
            if(oldUser){
              throw new ApolloError(' User is already exist', 'user var')
            }
            var enPass = await bcrypt.hash(input?.password, 10)
            const newUser = new User({
              username: input?.username,
              usersurname: input?.usersurname,
              role: input?.role,
              phone: input?.phone,
              email: input?.email.toLowerCase(),
              password: enPass
            })

            const token = jwt.sign({
              user_id: newUser._id,
              email: newUser.email, 
              username: newUser.username, 
              usersurname: newUser.usersurname, 
              role: newUser.role
            },"UNSAFE_STRING",{expiresIn:"2h" })
            newUser.token = token

            const res = await newUser.save()
            return {
              id: res.id,
              ...res._doc
            }
        },
        async loginUser(_, { input }, { res, req }){
          const user = await User.findOne({email: input?.email})
          if(user && (bcrypt.compare(input?.password, user.password))){
            const token = jwt.sign({
              user_id: user._id,
              email: user.email, 
              username: user.username, 
              usersurname: user.usersurname, 
              role: user.role
            },"UNSAFE_STRING",{expiresIn:"2h"})
            await res.cookie("token",token,{ httpOnly: true, secure: true})
            user.token = token
            return {
              id:user.id,
              ...user._doc
            }
          }else{
            throw new ApolloError('Doğrulama Başarısız Oldu', 'Doğrulama Başarısız Oldu')
          }
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID),
        logout:async (_, __, {res, req}) => {
          await res.cookie("token","", { httpOnly: true, secure: true })
          return "logout"
        },
        checkToken:async (_,__,{res, req}) => {
          if (req && req.headers) {
            const cookies = cookie.parse(req.headers.cookie)
            const userVerify = jwt.verify(cookies.token, "UNSAFE_STRING")
            const fUser = await User.findOne({_id:userVerify.user_id})
            if(fUser){
              return fUser
            }
            else{
              throw new GraphQLError("bilinmeyen token")
            }
          }else{
            new GraphQLError("not auth")
          }
        }
    }
}