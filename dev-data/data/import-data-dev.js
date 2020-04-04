const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path : './config.env'
});
const Tour = require('../../models/tourModel');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex :  true,
    useFindAndModify : false
}).then(con =>{
    console.log(con.connections);
    console.log("db koneksi success");
});

//reading the json file
const tours = JSON.parse(fs.readFileSync('./dev-data/data/simple.json','utf-8'));

//import data to databse
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log('data success imported');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

// delete db
const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        console.log('data success deleted');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}
console.log(process.argv);
