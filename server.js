import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import morgan from 'morgan';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//midddelwares
app.use(express.json())
// const corsOptions = {
//     origin: 'http://localhost:5173', // Allow all origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
//     credentials: true,
// };
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your frontend domain
    res.setHeader(
        "Access-Control-Allow-Headers",

        "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",

        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === 'OPTIONS') {
        return  res.sendStatus(204);
    }

    next();
});
app.use(morgan('dev'))

//api eps
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('Hello ')
})

app.listen(port, () => console.log("Server Running on PORT: " + port))