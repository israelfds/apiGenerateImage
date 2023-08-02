const translate = require('translate-google');

const sourceLang = 'en';
const targetLang = 'pt';

const textToTranslate = 'Hello, how are you?';

if (!textToTranslate || typeof textToTranslate !== 'string') {
  console.error('Texto de origem inválido.');
  return;
}

if (!sourceLang || !targetLang) {
  console.error('Idiomas de origem ou destino inválidos.');
  return;
}

translate(textToTranslate, { from: sourceLang, to: targetLang })
  .then((translatedText) => {
    console.log(`Texto original: ${textToTranslate}`);
    console.log(`Texto traduzido: ${translatedText}`);
  })
  .catch((err) => {
    console.error('Erro na tradução:', err);
  });
