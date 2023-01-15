const mongoose = require('mongoose')

const db = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb+srv://adnanfurkan:adnan-1234@rafyonetimi.uiemr8z.mongodb.net/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Database connected.(db_raf_yonetimi)");
}

module.exports = db;