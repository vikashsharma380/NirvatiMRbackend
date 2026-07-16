const express=require("express");

const router=express.Router();

const{

    
createProduct,

getProducts,

getProduct,

updateProduct,

deleteProduct,
toggleProduct,

}=require("../controllers/productController");

router.post("/",createProduct);

router.get("/",getProducts);

router.get("/:id",getProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);

router.patch("/:id/status",toggleProduct);

module.exports=router;