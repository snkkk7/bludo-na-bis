const express = require("express")

require('dotenv').config()

const modules = require("./models.js")

const cookieParser = require('cookie-parser')

const cors = require('cors')

const app = express()

const sequelize = require('./db.js')

const fileUpload = require('express-fileupload')

const path = require('path')

const errorHandler = require('./middlewares/ErrorHandlingMiddleware.js')

const PORT = process.env.PORT || 5000

const router = require('./routes/index.js')

app.use(express.json())

app.use(cookieParser())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.static(path.resolve(__dirname, 'static')))

// Обработка ошибок, последний Middleware

app.use(fileUpload({}))

app.use('/api',router)

app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log("Server started: 5000 PORT"))
    }catch(e){
        console.log(e)
    }
}


start()