/* Although MongoDB is schemaless, Mongoose works with schemas. 
Remember, a schema describes what data is in a database and how it is organised and structured.  */
const mongoose = require('mongoose');

let carSchema = mongoose.Schema({

model: {
    type:Number,
    required:true
},
make: {
    type:String,
    required:true
},
color: {
    type:String,
    required:true,
},
registration: {
    type:String,
    required:true,
},
owner: {
    type:String,
    required:true,
},
address: {
    type:String,
    required:false,
}
});

/*Models are special constructors that are compiled based on the schemas you have defined. According to Mongoose’s official documentation: 

“Instances of these models represent documents which can be saved and retrieved from our database. 
All document creation and retrieval from the database is handled by these models.”

Below is an example of how you create a model using the model() method. The two arguments you pass to this method are:  
The name of the model 
the schema object you created in the previous step
*/
module.exports = mongoose.model('cars', carSchema);
