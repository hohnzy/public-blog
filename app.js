// Setting up packages
// ==================
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var controller = require("./controllers/router.js");

// App Config
// ==========
mongoose.connect("mongodb://admin:admin@ds139425.mlab.com:39425/public-blog");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

controller(app);

// Server
// ======
var port = process.env.PORT || 3000; // enviroment or localhost:3000

app.listen(port, function() {
    console.log("SERVER IS RUNNING!")
});