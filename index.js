const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Definir o diretório onde os arquivos estáticos (como a página HTML) estão localizados
const src = path.join(__dirname, 'src');
app.use(express.static(src));

app.get('/generateimage', (req, res) => {
  res.sendFile(path.join(src, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
