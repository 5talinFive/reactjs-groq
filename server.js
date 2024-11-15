import express from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
const port = 3001;
const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY });

app.use(cors())

app.get('/api/groq-chat', async (req, res) => {
  const question = req.query.question || 'Escribe algo para interactuar.';
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
              {
                role: 'user',
                content: question,
              },
            ],
            model: 'llama-3.1-70b-versatile',
          });
          res.json(chatCompletion.choices[0]?.message?.content || 'Sin respuesta'); //message respuesta generada o no
    } catch (error) {
        res.status(500).json({ error: 'Error en la solicitud de Groq' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend ejecutándose en: http://localhost:${port}`);
  });



