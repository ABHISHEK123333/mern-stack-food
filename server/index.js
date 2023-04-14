
const express =require("express");
const app=express();
const cors=require("cors");
require("./connection/db.js");
app.use(cors());
app.use(express.json());
app.use("/api",require("./route/router.js"));
app.use("/api",require("./route/Orderdata.js"));
app.use("/api/auth",require("./route/Myorder.js"));
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`server is ruuning at port ${PORT}`);
})