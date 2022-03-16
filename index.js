const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()



// Configuracion
app.set('port', process.env.PORT || 8080)
app.set('json space', 4)


// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const storage = multer.diskStorage({
   destination: path.join(__dirname, 'public/uploads'),
   filename(req, file, cb){
      cb(null, new Date().getTime() + path.extname(file.originalname))
   }
})
app.use(multer({storage}).single('image'))


// Routes
app.use('/api/productos',require('./routes/products'))


//Static Files
app.use('/static', express.static(path.join(__dirname + '/public')))


// Inicio del Servidor
const server = app.listen(app.get('port'), () => {
   console.log(`Servidor http escuchando en el puerto ${app.get('port')}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))