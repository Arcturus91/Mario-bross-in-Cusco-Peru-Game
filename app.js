const express = require('express')

const app = express();
app.set("views", __dirname + "/views");
app.use(express.static('public'));
app.set("view engine", "hbs");




app.get('/', (req, res) => {
    res.render("index")
})





app.listen('3000', (req, res) => {

console.log('server started on port 3000.')})