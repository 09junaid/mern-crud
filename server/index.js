require("dotenv").config();
const express=require("express");
const app=express();
const PORT=process.env.PORT;
const connectDB= require ("./utils/db");
const bodyParser=require("body-parser");
const router = require("./routes/userRoute");
const cors=require("cors")
app.use(bodyParser.json());
app.use(cors(
  {
    origin:true,
    credentials:true
  }
));
app.use("/user",router);
const start=async()=>{
  try {
    app.listen(PORT,()=>{
      console.log(`Server is running on port:${PORT}`)
    })
    await connectDB();
  } catch (error) {
    console.log("Something wrong",error)
  }
}
start();