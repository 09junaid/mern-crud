const User=require("../models/User")

const createUser=async(req,res)=>{
  const {name,email,phone,address}=req.body
  try {
    const newUser=await User({
      name,email,phone,address
    });
    await newUser.save();
    return res.status(201).json({message:"User Created Successfully",success:true,newUser})
  } catch (error) {
    console.log("invalid Cradential",error);
      return res.status(500).json({message:"backend issue",success:false})
  }
}

const getDatabyID = async (req, res) => {
  try {
    const getUser = await User.find(); // findById is correct here

    if (!getUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({ message: "User fetched successfully", success: true, user: getUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const updateData=async(req,res)=>{
  try {
    const updateUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).json({message:"updated Success",success:true,updateUser})
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
}


const deleteUser=async(req,res)=>{
  try{
    const deleteUser=await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({message:"delete success",success:true,deleteUser})
  }catch(error){
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

module.exports={createUser,getDatabyID,updateData,deleteUser};