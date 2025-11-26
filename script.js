document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typing Effect for Terminal Text
    const terminalText = document.getElementById('typing-text');
    const messages = [
        "ESTABLISHING SECURE CONNECTION...",
        "ACCESSING RITP MAINFRAME...",
        "DOWNLOADING CLASSIFIED ASSETS...",
        "ACCESS GRANTED."
    ];
    
    let msgIndex = 0;
    let charIndex = 0;
    
    function typeWriter() {
        if (msgIndex < messages.length) {
            const currentMsg = messages[msgIndex];
            
            if (charIndex < currentMsg.length) {
                terminalText.innerHTML = currentMsg.substring(0, charIndex + 1) + '<span class="cursor">_</span>';
                charIndex++;
                setTimeout(typeWriter, 50); // Typing speed
            } else {
                setTimeout(() => {
                    msgIndex++;
                    charIndex = 0;
                    typeWriter();
                }, 1000); // Wait before next message
            }
        } else {
            terminalText.innerHTML = "SYSTEM READY. WELCOME TO KAIZEN." + '<span class="cursor blink">_</span>';
        }
    }
    
    typeWriter();

    // 2. Random Glitch Effect on Title
    const title = document.querySelector('.main-title');
    
    setInterval(() => {
        if(Math.random() > 0.9) {
            title.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            title.style.textShadow = `${Math.random() * 10}px 0 red, -${Math.random() * 10}px 0 blue`;
            
            setTimeout(() => {
                title.style.transform = 'none';
                title.style.textShadow = '0 0 10px var(--stranger-red), 0 0 20px var(--stranger-red), 0 0 40px var(--dark-red)';
            }, 100);
        }
    }, 200);

    // 3. Audio System - Low Drone Hum (Autoplay with Interaction Fallback)
    const initAudio = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        let isPlaying = false;

        // Function to start the sound
        const playSound = () => {
            if (isPlaying) return;
            
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(50, audioCtx.currentTime); // Low drone
            
            // Smooth fade in
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 2); 
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            isPlaying = true;
        };

        // Check if context is suspended (Autoplay policy)
        if (audioCtx.state === 'suspended') {
            const resumeAudio = () => {
                audioCtx.resume().then(() => {
                    playSound();
                    // Clean up listeners
                    document.removeEventListener('click', resumeAudio);
                    document.removeEventListener('keydown', resumeAudio);
                    document.removeEventListener('touchstart', resumeAudio);
                });
            };
            
            // Listen for any interaction to unlock audio
            document.addEventListener('click', resumeAudio);
            document.addEventListener('keydown', resumeAudio);
            document.addEventListener('touchstart', resumeAudio);
        } else {
            // Allowed to play immediately
            playSound();
        }
    };

    initAudio();
});
