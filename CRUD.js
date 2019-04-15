const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_minal', {useNewUrlParser: true});
const User = require('./model/users');
const { check, validationResult } = require('express-validator/check');
//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
app.use(bodyParser.json());
app.post('/User',[check('email').isEmail(),check('password').isLength({ min: 5 })],async (req, res) => {
   
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }{
            errors:[{
              "location": "body",
              "msg": "Invalid value",
              "param": "username"
            }]
          }
    
  
      const { body } = req;
      const user = new User(body);
      const result = await user.save();
      res.status(200).json({
         result,
         message: "Data get.",
      });
   } catch (error) {
       res.status(500).json({
          message: error.message || "An unexpected error occure while processing your request."
       })
   }
});
app.get('/user', async (req, res) => {
   try {
      const result = await User.find();
      res.status(200).json({
         result,
         message: "Data get.",
      });
   } catch (error) {
       res.status(500).json({
          message: error.message || "An unexpected error occure while processing your request."
       })
   }
});
app.put('/user/:id', async(req,res)=>
{
try {
  const{params}=req;
  const result=await User.findByIdAndUpdate(req.params.id, {$set: req.body})
  const value=result.save();
  res.status(200).json({
     value,
     message:"data updated"
  })
} catch (error) {
   res.status(500).json({
      message: error.message || "An unexpected error occure while processing your request."
})

}

});
app.delete('/user/:id', async(req,res)=>
{
try {
   const{params}=req;
  const result=await User.findByIdAndDelete({_id :req.params.id});
  res.status(200).json({
     result,
     message:"data deleted"
  })
} catch (error) {
   res.status(500).json({
      message: error.message || "An unexpected error occure while processing your request."
})

}

});

var server = app.listen(8000, function () {

   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
});
