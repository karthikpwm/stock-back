const express = require( 'express' )
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Bring in the routes
// localhost
app.use( "/analytic", require('./routes/analytic'))

// app.use( "/user", require('./routes/user'))
// app.use( "/credit", require('./routes/credit'))
// app.use( "/customer", require('./routes/customer'))
// app.use( "/bill", require('./routes/bill'))
// app.use( "/dictionary/place", require('./routes/place'))
// app.use('/company', require('./routes/company'))

// Setup Error Handlers
const errorHandlers = require('./handlers/errorHandler')

app.use(errorHandlers.notFound)
app.use(errorHandlers.mongoseError)
if(process.env.ENV === 'DEVELOPMENT'){
  app.use(errorHandlers.developmentErrors)
} else {
  app.use(errorHandlers.productionError)
}

app.use(errorHandlers.notFound)

module.exports = app;