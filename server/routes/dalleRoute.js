import * as dotenv from 'dotenv';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();


/*This code creates a new instance of the Configuration class and initializes it with the API key and organization values from environment variables. The Configuration class is likely used to configure the OpenAI API client with the necessary credentials to make authenticated requests to the OpenAI API*/
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from Dall-E!' });
});


/*This code defines a route for a POST request to a router. When the route is accessed, it expects a request body with a "prompt" property. It then uses the OpenAI API to generate an image based on the prompt, with a size of 1024x1024 pixels. The response format is set to base64 encoded JSON. The generated image is then sent back as a response in the JSON format, with a "photo" property containing the base64 encoded image data. If an error occurs, it is caught and a 500 status code is sent back with an error message.*/
router.route('/').post(async (req, res) => {
    try {

        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        //This code retrieves the base64 encoded JSON data of the first image from an AI response object and assigns it to a variable named "image".
        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image });

    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});


export default router;
