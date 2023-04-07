import cors from 'cors';
import * as dotenv from 'dotenv';
import express from "express";


import connectDB from './mongoDB/connect.js';
import chatgptRoute from './routes/chatgptRoute.js';
import dalleRoute from './routes/dalleRoute.js';
import postRoute from './routes/postRoute.js';


dotenv.config();

//This code initializes an Express application and sets up two middleware functions.
const app = express();

/*The first middleware function is 
cors() , which enables Cross-Origin Resource Sharing (CORS) for the application. This allows the application to make requests to and receive responses from other domains*/
app.use(cors());

/*The second middleware function is 
express.json() , which parses incoming requests with JSON payloads. The limit option sets the maximum size of the JSON payload that can be received by the application to 50 megabytes.*/
app.use(express.json({ limit: '50mb' }));

/*This code allows the application to handle different types of requests related to dalle, and chat using GPT.*/
app.use('/api/v1/post', postRoute);
app.use('/api/v1/dalle', dalleRoute);
app.use('/api/v1/chatgpt', chatgptRoute);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from ArtiFusion',
    });
});

const startServer = async () => {
    try {

        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on the port http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }
};

startServer();