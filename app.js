var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var db = mongoose.connect('mongodb://localhost/bookAPI', {
    useNewUrlParser: true
});

mongoose.connection.once('open', function () {
    console.log("Connected to mongodb");
}).on('error', function (error) {
    console.log("Failed to connect");
});

var Book = require("./models/bookModel");

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

bookRouter = require("./Routes/bookRouter.js")(Book);

app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter);   

app.get("/", function (req, res) {
    res.send("Welcom to Node-REST API");
});

app.listen(port, function () {
    console.log("Gulp is Running My APP on Port: " + port);
});