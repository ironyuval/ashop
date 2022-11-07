const app = require("./app");
const connectDatabase = require("./db/Database.js");
const dotenv = require("dotenv");
dotenv.config({
    path:"backend/config/.env"
})

connectDatabase();

const server = app.listen(process.env.PORT,() =>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})