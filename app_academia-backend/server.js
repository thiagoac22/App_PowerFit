require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/perguntar', async (req, res) => {
  const { pergunta } = req.body;

  if (!pergunta) {
    return res.status(400).json({ erro: 'Pergunta não enviada' });
  }

  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      message: pergunta,
    });

    const resposta = response.text;
    res.json({ resposta });
  } catch (error) {
    console.error('Erro na Cohere:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    res.status(500).json({ erro: 'Erro ao gerar resposta da IA' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://192.168.18.73:${port}`);
});
