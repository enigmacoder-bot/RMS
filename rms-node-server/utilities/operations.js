 const randomizeString = (input) => {
    input = input.split('@')[0]
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < input.length; i++) {
        if (Math.random() < 0.5) {
            result += input[i];
        } else {
            result += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
    }
    result += Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    return result;
}


const convertFileToBase64 = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      try {
        const base64 = fileBuffer.toString('base64');
        resolve(base64); // Resolve with the Base64 string
      } catch (err) {
        reject(err); // Handle any errors
      }
    });
  }

module.exports = {convertFileToBase64,randomizeString};
