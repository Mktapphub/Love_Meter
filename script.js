document.addEventListener("DOMContentLoaded", () => {
// Love emojis for floating animation
const loveEmojis = ['❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '♥️'];

// Generate floating hearts continuously
function createFloatingHeart() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (3 + Math.random() * 4) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, parseFloat(heart.style.animationDuration) * 1000 + 2000);
}

// Start generating hearts
setInterval(createFloatingHeart, 800);

// Get DOM elements
const music = document.getElementById('love');
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const percentageNumber = document.getElementById('percentageNumber');
const namesDisplay = document.getElementById('namesDisplay');
const resultMessage = document.getElementById('resultMessage');

// Calculate love percentage
function calculateLove() {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();
    
    if (!name1 || !name2) {
        return;
    }
    
    // Disable button and show loading
    calculateBtn.disabled = true;
    calculateBtn.innerHTML = `
        <svg class="button-icon spinning" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        Calculating...
    `;
    
    setTimeout(() => {
        const n1 = name1.toLowerCase();
        const n2 = name2.toLowerCase();
        
        // Special case
        const isSpecialCouple = 
            (n1 === 'minhajul' && n2 === 'afnan') || 
            (n1 === 'afnan' && n2 === 'minhajul');
        
        let lovePercent;
        
        if (isSpecialCouple) {
            lovePercent = 100;
        } else {
            const combined = n1 + n2;
            const total = combined.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
            lovePercent = total % 101;
        }
        
        let message = '';
        if (lovePercent <= 25) {
            message = "Every great love story starts with a single step. Keep nurturing the connection.";
        } else if (lovePercent <= 50) {
            message = "Love grows with patience and understanding. Water it with kindness.";
        } else if (lovePercent <= 75) {
            message = "True love is built on trust, respect, and genuine care for each other.";
        } else {
            message = "A perfect bond is rare and precious. Cherish it, protect it, and let it flourish forever.";
        }
        
        // Show result
        music.play()
        percentageNumber.textContent = lovePercent;
        namesDisplay.textContent = name1 + ' + ' + name2;
        resultMessage.textContent = message;
        
        inputSection.style.display = 'none';
        resultSection.style.display = 'flex';
        
        // Reset button
        calculateBtn.disabled = false;
        calculateBtn.innerHTML = `
            <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Calculate Love
        `;
    }, 1500);
}

// Reset form
function resetForm() {
    name1Input.value = '';
    name2Input.value = '';
    inputSection.style.display = 'flex';
    resultSection.style.display = 'none';
}

// Event listeners
calculateBtn.addEventListener('click', calculateLove);
resetBtn.addEventListener('click', resetForm);

// Allow Enter key to calculate
name1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateLove();
});

name2Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateLove();
});
});