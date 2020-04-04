const dotenv = require('dotenv');
dotenv.config({
    path : './config.env'
});
const app = require('./app');
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex :  true,
    useFindAndModify : false
}).then(con =>{
    console.log(con.connections);
    console.log("db koneksi success");
});


// const nTour = new Tour({
//     name : 'the blue ocean tours',
//     rating : 4.8,
//     price : 500
// });

// nTour.save().then((doc)=>{
//     console.log(doc);
// }).catch((err)=>{
//     console.log('error paaaa : ',err);
// });
//console.log(process.env);
//console.log(process.env.NODE_ENV);
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listeninng on port ${port}`);
})