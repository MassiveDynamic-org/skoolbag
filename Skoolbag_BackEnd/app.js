const express = require("express");
const schoolRouter = require("./routs/schoolRouter")
const morgan = require("morgan")
const {interceptHEders} = require("./intercepters")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const validator = require("express-validator")

// config Envirenment file
dotenv.config();

//DB connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>console.log("DB connected"));

mongoose.connection.on("error",err => {
    console.log(`db connection error ${err}`)
})



const app = express();

//middleware
app.use(interceptHEders)
app.use(morgan("dev"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(validator());

app.use("/",schoolRouter);

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`skoolbag API running at ${port}`)
});