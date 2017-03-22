let express = require("express");
var router = express.Router();

router.get("/test",(req,res)=>{
    res.send("<p>hello supervisor</p>");

});

module.exports = router;
