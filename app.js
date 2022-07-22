const express = require('express')

const app = express();
app.set("views", __dirname + "/views");
app.use(express.static('public'));
app.set("view engine", "hbs");

app.set('port',process.env.PORT || 3000);



app.get('/', (req, res) => {
    res.render("index")
})





app.listen(app.get('port'), (req, res) => {

console.log(`server started on port ${app.get('port')}`)})