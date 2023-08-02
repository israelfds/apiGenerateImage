// Função para enviar uma solicitação POST usando axios
async function submitPost(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error('Error submitting POST request: ' + error.message);
  }
}

// Função para exibir a imagem codificada em base64 na página
function displayImage(b64Image) {
  const image = new Image();
  image.src = 'data:image/png;base64,' + b64Image;
  const generatedImageElement = document.getElementById('generatedImage');
  generatedImageElement.src = image.src;
  generatedImageElement.style.display = 'block'; // Certifique-se de que a imagem seja exibida, caso estivesse oculta antes
}

// URL da API
const apiUrl = 'http://localhost:3001/generate-image';

// Função para gerar a imagem
async function generateImage() {
  const prompt = document.getElementById('prompt').value;

  const data = {
    prompt: prompt,
  };

  // Exibe o elemento de loading
  const loadingElement = document.getElementById('loading');
  loadingElement.style.display = 'block';

  try {
    const response = await submitPost(apiUrl, data);
    //console.log(response); // Verifica a resposta da API

    if (response.image) {
      // Exibe a imagem na página
      displayImage(response.image);
    } else {
      console.error('Error: No image data found in the API response.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Esconde o elemento de loading quando a imagem for recebida ou houver um erro
    loadingElement.style.display = 'none';
  }
}
