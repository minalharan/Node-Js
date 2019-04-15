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
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
