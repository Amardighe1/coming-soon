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
        if (!AudioContext) return;

        const audioCtx = new AudioContext();
        let isPlaying = false;

        const playSound = () => {
            if (isPlaying) return;
            
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(60, audioCtx.currentTime); // 60Hz Mains Hum
            
            // Increased volume to make sure it is audible
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 1); 
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            isPlaying = true;
        };

        const unlockAudio = () => {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().then(() => {
                    playSound();
                });
            } else {
                playSound();
            }
            // Remove all listeners once triggered
            ['click', 'keydown', 'touchstart', 'mousemove'].forEach(e => 
                document.removeEventListener(e, unlockAudio)
            );
        };

        // Try to play immediately
        if (audioCtx.state !== 'suspended') {
            playSound();
        } else {
            // Add listeners for ANY interaction
            ['click', 'keydown', 'touchstart', 'mousemove'].forEach(e => 
                document.addEventListener(e, unlockAudio)
            );
        }
    };

    initAudio();
});
