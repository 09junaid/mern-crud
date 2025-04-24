const mongoose=require("mongoose");
const connectDB=async()=>{
  try {
  await mongoose.connect(process.env.DB_URI,{
    dbName:"fuullcrud"
  })
  console.log("✅ Connection Success");
} catch (error) {
  console.log("❌ DB Error");
}}
module.exports=connectDB;