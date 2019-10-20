const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;

//define the path for Express js config
const publicSrc = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views folder location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
//setup a static dirctory to server using static html file 
app.use(express.static(publicSrc));

//call product data
let rawdata = require("../public/data.json");
const data = JSON.parse(JSON.stringify(rawdata));

app.get('/', (req, res) => {
    res.render('index', {
        title: data[0].title,
        info:  data[0].info,
        img:   data[0].img,
        price: data[0].price,
        sizes: data[0].size,
        sizem: data[1].size,
        sizel: data[2].size,
        id1:   data[0].id,
        id2:   data[1].id,
        id3:   data[2].id,
    });
});
app.get('/product', (req, res)=>{
    
})

// Start Server
app.listen(port, () => {
    console.log( port + ' is listen')
})  
