// Setting up packages
// ==================
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Setting up mongoDB - mongoose
// =============================
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    text: String,
    time: {type: Date, default: Date.now}
});
var Post = mongoose.model("Post", postSchema);

// App Config
// ==========
mongoose.connect("mongodb://admin:admin@ds139425.mlab.com:39425/public-blog");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// API - Routes
// ============

// INDEX Route - show all posts
// From "/" redirect to posts
app.get("/", function(req, res) {
    res.redirect("/posts");
});
app.get("/posts", function(req, res) {
    Post.find({}, function(err, posts) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {posts: posts});
        }
    });
});

// NEW Post Route
app.get("/posts/new", function(req, res) {
    res.render("new");
});

// CREATE New Post Route
app.post("/posts", function(req, res) {
    var title = req.body.title;
    var text = req.body.text;
    var newPost = {title: title, text: text};
    Post.create(newPost, function(err, createdPost){
        if(err){
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    });
});

// SHOW Post Route
app.get("/posts/:id", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
        if(err) {
            res.redirect("/posts");
        } else {
            res.render("show", {post: foundPost});
        }
    });
});

// EDIT Post Route - show edit page
app.get("/posts/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/posts");
        } else {
            res.render("edit", {post: foundPost});
        }
    });
});

// UPDATE Post Route - update edited post
app.put("/posts/:id", function(req, res) {
    var updatePost = {
        title: req.body.title,
        text: req.body.text
    };
    Post.findByIdAndUpdate(req.params.id, updatePost, function(err, updatedPost){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

// DELETE Post Route
app.delete("/posts/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    });
});

// Server
// ======
var port = process.env.PORT || 3000; // enviroment or localhost:3000

app.listen(port, function() {
    console.log("SERVER IS RUNNING!")
});