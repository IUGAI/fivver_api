import express from "express";
import mongoose from "mongoose";

const app = express()

mongoose.set('strictQuery', true)


const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://aleks:514115aasss-@cluster0.qq3zxmp.mongodb.net/?retryWrites=true&w=majority&dbname=fiverr')
        console.log('Connected to mongodb');
    } catch (error) {
        handleError(error);
    }
    
}

app.listen(8800, () => {
    connect()
    console.log("BackEnd server is running");
})