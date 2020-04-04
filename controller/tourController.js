const Tour = require('../models/tourModel');
exports.aliasTopTours = (req, res, next)=>{
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}
//const fs = require('fs');





//pengecekan inavlid id
// exports.checkId = (req, res, next, value)=>{
//     console.log(`tour id = ${value}`);
//     if(req.params.id * 1 > data.length){
//         return res.status(404).json({
//             status : 'fail',
//             message : 'invalid id'
//         });
//     }
//     next();
// }

//pengecekan data pengiriman
// exports.checkBody = (req, res, next)=>{
//      if(!req.body.name || !req.body.price){
//          res.status(400).json({
//              status : 'fail',
//              message : 'there no name or price tour'
//          });
//      }
//      next();
// }


exports.getAllTours =  async (req, res)=>{
    
    try{
        //1 filtering
        const queryObj = {...req.query};
        const excludedField = ['page', 'sort','limit','fields'];
        excludedField.forEach(el => delete queryObj[el]);
        //console.log(req.query, queryObj);
        console.log(queryObj);
        //const tours = await Tour.find(req.query);
        
        
        //2 advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, macth => `$${macth}`);
        console.log(JSON.parse(queryStr));

        //const query = Tour.find(queryObj);
        let query = Tour.find(JSON.parse(queryStr));
       // let query = Tour.find(queryObj);

        //3 sorting 
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            //query = query.sort(req.query.sort);
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt');
        }

        //3 field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            console.log(fields);
            query = query.select(fields);
        }else{
            query = query.select('-__v');    
        }

        //4 pagination
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 100;
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);
            if(req.query.page){
                const numTours = await Tour.countDocuments();
                if(skip >= numTours)throw new Error('this page doesnt exists');
            }
            // const query =  Tour.find()
            // .where('duration')
            // .equals(5)
            // .where('difficulty')
            // .equals('easy');        
        const tours = await query

        res.status(200).json({
                status : 'success',
                results : tours.length,
                data : {
                    tours
                }
                
        });

    }catch(err){
        res.status(404).json({
            status : 'fail',
            message : err
        });
    }
    
}

exports.getOneTour = async (req, res)=>{
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
               status : 'success',
                data : {
                           tour
                        }
               });
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message : err
        });
    }
  
}


exports.createTour = async(req, res)=>{

    try{
            // const newTour = new Tour({});
            // newTour.save();
            const newTour = await Tour.create(req.body);
            res.status(201).json({
                status : "success",
                data : {
                    tour : newTour
                }
        
            });

    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err
        });
    }
   
 }

 exports.updateTour = async (req, res)=>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })
        res.status(200).json({
            status : 'success',
            data : {
                tour
            }
        });

    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err
        });
    }
 }

 exports.deleteTour = async(req, res)=>{
    try{
        await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status : 'success',
            data : null
        });
    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err
        });
    }

}