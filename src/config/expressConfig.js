const express = require('express');
const path = require('path');


function expressConfig(app){
    app.use(express.urlencoded({extended: false}));
    app.use(express.static(path.resolve(__dirname, 'src/static')))
}

module.exports = expressConfig;