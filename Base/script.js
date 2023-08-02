async function submitPost(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error('Error submitting POST request: ' + error.message);
    }
  }
  
  function saveEncodedImage(b64Image, outputPath) {
    const imageBuffer = Buffer.from(b64Image, 'base64');
    const blob = new Blob([imageBuffer], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById('generatedImage').src = imageUrl;
  }
  
  const txt2imgUrl = 'http://127.0.0.1:7860/sdapi/v1/txt2img';
  
  function generateImage() {
    const prompt = document.getElementById('prompt').value;
  
    const data = {
      prompt: prompt,
    };
  
    submitPost(txt2imgUrl, data)
      .then((response) => {
        const image = response.images[0];
        saveEncodedImage(image, 'car.png');
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }