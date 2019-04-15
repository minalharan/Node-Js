const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
app.use(bodyParser.json());
app.post("/addImage", upload.single("avatar"), (req, res) => {
  res.status(200).json({
    files: req.file,
    body: req.body,
  });
});
app.post('/addImage',  upload.fields([{ name: 'avatar', maxCount: 2 }, { name: 'image', maxCount: 8 }]), (req, res)  => {
  res.status(200).json({
     files: req.files,
     body: req.body
  })
})
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
