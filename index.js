const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))
app.use(express.static('./assests'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up a view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        // console.log('Error: ', err);
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})