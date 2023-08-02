const express = require('express');
const axios = require('axios');
const cors = require('cors');
const translate = require('translate-google');

const app = express();
app.use(express.json());
app.use(cors());

const txt2imgUrl = 'http://127.0.0.1:7861/sdapi/v1/txt2img'; // Sua URL para a geração de imagens

async function submitPost(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error('Error submitting POST request: ' + error.message);
  }
}

app.post('/generate-image', async (req, res) => {
  const prompt = req.body.prompt;
  const targetLang = 'en'; // Defina o idioma de destino (inglês)

  try {
    // Traduzir o texto do português para o inglês
    const translatedPrompt = await translate(prompt, { to: targetLang });
    
    const data = { prompt: translatedPrompt, steps: 30 };
    const response = await submitPost(txt2imgUrl, data);
    const image = response.images[0];
    res.json({ image });
  } catch (error) {
    res.status(500).json({ error: 'Error generating image' });
  }
});

const PORT = 3001; // Escolha a porta que deseja usar para o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
