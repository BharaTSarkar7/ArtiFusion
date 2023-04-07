import * as dotenv from 'dotenv';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hell0 from ChatGPT!' });
});


/*This code defines a route for a POST request to a router. When the route is accessed, it uses the OpenAI API to generate a random text prompt for the DALL·E image generation model. The prompt includes details such as the genre and type of painting the user wants, and options can include oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white, etc. The generated prompt is then sent back as a response to the client. If there is an error, it will be caught and a 500 status code will be sent back with an error message.*/
router.route('/').post(async (req, res) => {
    try {

        const aiResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
            max_tokens: 100,
            temperature: 0.8,
        });

        const generatedPrompt = aiResponse.data.choices[0].text.trim();

        res.status(200).send({ prompt: generatedPrompt });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
    }
});

export default router; 