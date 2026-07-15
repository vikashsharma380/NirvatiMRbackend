const express=require("express");

const router=express.Router();

const{

getMRs,

createMR,

updateMR,

toggleMR,

deleteMR

}=require("../controllers/userController");

router.get("/mr",getMRs);

router.post("/mr",createMR);

router.put("/mr/:id",updateMR);

router.patch("/mr/:id",toggleMR);

router.delete("/mr/:id",deleteMR);

module.exports=router;