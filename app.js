const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

var favicon = require('serve-favicon')
var path = require('path')

const db = require('./models');

class App{

    constructor(){
        this.app=express();
        

        this.dbConnection();

        this.setMiddleWare();

        this.setLocals();

        this.setViewEngine();

        this.getRouting();

    }

    
    dbConnection(){
        db.sequelize.authenticate()
        .then(() => {
            console.log("Connection has been established");
        })
        .then(()=>{
            console.log("DB Sync complete.");
            return db.sequelize.sync();
        })
        .catch( err =>{
            console.error("Unable to connect to the DB",err);
        });
    }

    setMiddleWare(){
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false}));
        this.app.use(favicon(path.join(__dirname,'public','favicon.png')))
    }

    setLocals(){
        this.app.use((req,res,next) => {
            this.app.locals.req_path = req.path;
            next();
        });
    }

    setViewEngine(){
        nunjucks.configure('template',{
            autoescape: true,
            express:this.app
        });
    }

    getRouting(){
        this.app.use(require('./controllers'));
    }
}



module.exports = new App().app;
