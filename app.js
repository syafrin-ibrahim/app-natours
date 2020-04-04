
const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//console.log(app.get('env'));
//1 middle ware
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    
    app.use(morgan('dev'));
}
app.use(express.json());
//middleware untuk mengakses static file html
app.use(express.static(`${__dirname}/public`))


app.use('/tours', tourRouter);
app.use('/users', userRouter);


module.exports = app;