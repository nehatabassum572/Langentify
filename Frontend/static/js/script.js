document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#ffffff" }, // Changed to white particles
      "shape": { "type": "circle" },
      "opacity": { "value": 1, "random": true },
      "size": { "value": 3, "random": true },
      "line_linked": { 
        "enable": true, 
        "distance": 150, 
        "color": "#ffffff",
        "opacity": 0.4, 
        "width": 1 
      },
      "move": { "enable": true, "speed": 3, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
    }
  });

  
    document.querySelector('.info-icon').addEventListener('click', function() {
    const infoBox = document.querySelector('.language-info');
    const content = document.querySelector('.info-content');
    
    if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
        content.style.maxHeight = '500px';
        infoBox.style.backgroundColor = 'rgba(27, 36, 57, 0.95)';
    } else {
        content.style.maxHeight = '0';
        infoBox.style.backgroundColor = 'rgba(27, 36, 57, 0.9)';
    }
    });

  
  function countWords() {
    const textInput = document.getElementById('text-input');
    const wordCountDisplay = document.getElementById('word-count');
    const text = textInput.value.trim();
    const words = text ? text.split(/\s+/).filter(word => word.length > 0) : [];
    const wordCount = words.length;
    
    wordCountDisplay.textContent = `${wordCount}/200 words`;
    
    if (wordCount > 200) {
      wordCountDisplay.classList.add('word-limit-error');
      const limitedText = words.slice(0, 200).join(' ');
      textInput.value = limitedText;
      wordCountDisplay.textContent = "200/200 words (Max limit reached)";
      
      if (!document.querySelector('.max-words-error')) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'max-words-error';
        errorMsg.style.color = '#ff6b6b';
        errorMsg.style.marginTop = '5px';
        errorMsg.textContent = 'Please limit to 200 words maximum';
        textInput.parentNode.insertBefore(errorMsg, textInput.nextSibling);
        
        setTimeout(() => {
          errorMsg.remove();
        }, 3000);
      }
    } else {
      wordCountDisplay.classList.remove('word-limit-error');
      const existingError = document.querySelector('.max-words-error');
      if (existingError) existingError.remove();
    }
  }

  
  const textInput = document.getElementById('text-input');
  const detectBtn = document.getElementById('detect-btn');
  const resultDiv = document.getElementById('result');
  const confidenceDiv = document.getElementById('confidence');
  const loadingDiv = document.createElement('div');
  
 
  loadingDiv.className = 'loading';
  loadingDiv.innerHTML = '<div class="spinner"></div><p>Detecting language...</p>';
  document.querySelector('.container').appendChild(loadingDiv);
  loadingDiv.style.display = 'none';

  
  countWords();


  textInput.addEventListener('input', function() {
    countWords(); // Update word count
    clearTimeout(typingTimer);
    if (textInput.value.trim().length > 10) {
      typingTimer = setTimeout(() => {
        if (document.getElementById('text-input').value.split(/\s+/).filter(word => word.length > 0).length <= 200) {
          detectBtn.click();
        }
      }, 1000);
    }
  });

  
  detectBtn.addEventListener('click', async function() {
    const text = textInput.value.trim();
    
    if (!text) {
      resultDiv.innerHTML = '<p>Please enter text to detect the language.</p>';
      confidenceDiv.innerHTML = '<p>Confidence: N/A</p>';
      return;
    }
    
    
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount > 200) {
      resultDiv.innerHTML = '<p>Please limit input to 200 words maximum.</p>';
      return;
    }
    
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';
    confidenceDiv.innerHTML = '';
    
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      resultDiv.innerHTML = `
        <p><strong>Detected Language:</strong> ${data.language}</p>
      `;
      confidenceDiv.innerHTML = `
        <p><strong>Confidence:</strong> ${(data.confidence * 100).toFixed(2)}%</p>
      `;
      
    } catch (error) {
      console.error('Error:', error);
      resultDiv.innerHTML = '<p>Error detecting language. Please try again.</p>';
      confidenceDiv.innerHTML = '<p>Confidence: N/A</p>';
    } finally {
      loadingDiv.style.display = 'none';
    }
  });
});