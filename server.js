import express from "express";
import mongoose from "mongoose";
import userRoute from "./router/user.router.js"
import authRoute from './router/auth.router.js'
import conversationRoute from './router/conversation.router.js'
import reviewRoute from './router/review.router.js'
import gigRoute from './router/gig.router.js'
import messageRoute from './router/message.router.js'
import orderRoute from './router/order.router.js'
import cookieParser from "cookie-parser";


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


app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);


app.listen(8800, () => {
    connect()
    console.log("BackEnd server is running");
})