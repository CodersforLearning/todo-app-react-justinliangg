const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setting up mongodb database
const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27017/todoList';
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//serving react build
app.use(express.static(path.resolve(__dirname, '../build')));

//list route
const listRoutes = require(path.join(__dirname, "routes/ListRoute.js"));
app.use("/api/list", listRoutes);

//user route.
const userRoutes = require(path.join(__dirname, "routes/UserRoute.js"));
app.use("/api/user", userRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });

//error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.json({ error: err.message});
});

//start server
app.listen(process.env.PORT || 3000, () =>{
    console.log("Listening on 3000");
});

