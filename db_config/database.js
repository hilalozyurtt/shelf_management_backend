const mongoose = require('mongoose')

const db = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://localhost:27017/db_raf_yonetimi',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Database connected.(db_raf_yonetimi)");
}

module.exports = db;