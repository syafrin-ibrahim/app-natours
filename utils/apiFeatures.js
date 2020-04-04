class ApiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
            //1 filtering
        const queryObj = { ...this.queryString };
        const excludedField = ['page', 'sort','limit','fields'];
        excludedField.forEach(el => delete queryObj[el]);
        //console.log(req.query, queryObj);
      //  console.log(queryObj);
        //const tours = await Tour.find(req.query);
        
        
        //2 advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, macth => `$${macth}`);
        //console.log(JSON.parse(queryStr));

        this.query.find(JSON.parse(queryStr));
        return this;
    }

    sorting(){
           //3 sorting 
           if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy);
            //query = query.sort(req.query.sort);
            this.query = this.query.sort(sortBy);
            }else{
                this.query = this.query.sort('-createdAt');
            }
            return this;
    }

    limiting(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            console.log(fields);
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');    
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1;
            const limit = this.queryString.limit * 1 || 100;
            const skip = (page - 1) * limit;
            this.query = this.query.skip(skip).limit(limit);
            // if(this.queryString.page){
            //     const numTours = await Tour.countDocuments();
            //     if(skip >= numTours)throw new Error('this page doesnt exists');
            // }

            return this;
    }


}

module.exports = ApiFeatures;