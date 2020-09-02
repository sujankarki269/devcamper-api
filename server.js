
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser= require('cookie-parser');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');

const connectDb = require('./config/db');



//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');


//Load env vars
dotenv.config({ path: './config/.env'});


//connect to DB
connectDb();

const app = express();

//Body Parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());
//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
// File uploading
app.use(fileupload());


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server= app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//Handle unhandled promise rejection
process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    server.close(()=>process.exit(1));
});