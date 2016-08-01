var Post = require("../models/blogposts.js");
var bodyParser = require("body-parser");


module.exports = function(app) {

    app.use(bodyParser.urlencoded({extended: true}));

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
        var author = req.body.author;
        var newPost = {title: title, text: text, author: author};
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
            text: req.body.text,
            author: req.body.author
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
}