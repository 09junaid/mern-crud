const {createUser,getDatabyID,updateData,deleteUser}=require("../controllers/userController");
const express=require("express");
const router=express.Router();

router.post("/create",createUser);
router.get("/get",getDatabyID);
router.put("/update/:id",updateData);
router.delete("/delete/:id",deleteUser);

module.exports=router;