document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP TONE.JS and INSTRUMENTS ---

    // Create a piano sampler
    const piano = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D4": "D4.mp3",
            "E4": "E4.mp3",
            "F4": "F4.mp3",
        },
        baseUrl: "assets/sounds/piano/", // Path to your piano samples
        onload: () => console.log("Piano loaded!")
    }).toDestination();

    // Create a drum sampler
    const drums = new Tone.Sampler({
        urls: {
            "C4": "kick.wav", // Map C4 to kick
            "D4": "snare.wav", // Map D4 to snare
            "E4": "hihat.wav", // Map E4 to hi-hat
        },
        baseUrl: "assets/sounds/drums/", // Path to your drum samples
        onload: () => console.log("Drums loaded!")
    }).toDestination();

    // An object to hold our instruments
    const instruments = {
        piano: piano,
        drums: drums,
    };

    let currentInstrument = null; // No instrument selected initially
    let currentInstrumentName = '';

    // --- 2. KEY MAPPING ---
    // Define which keyboard key plays which note
    const keyMappings = {
        piano: { 'a': 'C4', 's': 'D4', 'd': 'E4', 'f': 'F4' },
        drums: { 'a': 'C4', 's': 'D4', 'd': 'E4' }
    };

    // --- 3. HANDLE INSTRUMENT SELECTION ---
    
    document.querySelectorAll('.instrument').forEach(instrumentDiv => {
        instrumentDiv.addEventListener('click', () => {
            // Start audio context on user interaction
            Tone.start();

            // Clear previous selection
            document.querySelectorAll('.instrument').forEach(div => div.classList.remove('selected'));
            
            // Select the new one
            instrumentDiv.classList.add('selected');
            currentInstrumentName = instrumentDiv.id; // e.g., 'piano'
            currentInstrument = instruments[currentInstrumentName];
            console.log(`${currentInstrumentName} selected`);
        });
    });

    // --- 4. HANDLE KEYBOARD INPUT ---

    document.addEventListener('keydown', (event) => {
        if (!currentInstrument) return; // Do nothing if no instrument is selected

        const key = event.key.toLowerCase();
        const note = keyMappings[currentInstrumentName]?.[key];

        if (note) {
            // Play the note
            currentInstrument.triggerAttack(note);
        }
    });

});