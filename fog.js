// // script.js
// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.querySelector('.leaves-container');

//     // Function to create a leaf
//     function createLeaf() {
//         const leaf = document.createElement('div');
//         leaf.classList.add('leaf');

//         // Randomize leaf position and animation properties
//         leaf.style.left = `${Math.random() * 100}vw`;
//         leaf.style.animationDuration = `${Math.random() * 5 + 5}s`;
//         leaf.style.animationDelay = `${Math.random() * 2}s`;

//         // Enable dragging functionality
//         let isDragging = false;
//         let offsetX = 0, offsetY = 0;

//         leaf.addEventListener('mousedown', (event) => {
//             isDragging = true;
//             offsetX = event.clientX - leaf.offsetLeft;
//             offsetY = event.clientY - leaf.offsetTop;

//             // Prevent default drag behavior
//             event.preventDefault();
//         });

//         // Move the leaf while dragging
//         document.addEventListener('mousemove', (event) => {
//             if (isDragging) {
//                 leaf.style.transition = "none"; // Disable animation during drag
//                 leaf.style.left = `${event.clientX - offsetX}px`;
//                 leaf.style.top = `${event.clientY - offsetY}px`;
//             }
//         });

//         // Stop dragging
//         document.addEventListener('mouseup', () => {
//             if (isDragging) {
//                 isDragging = false;
//                 leaf.style.transition = ""; // Re-enable animation
//             }
//         });

//         // Remove leaf once it falls off the screen
//         leaf.addEventListener('animationend', () => {
//             leaf.remove();
//         });

//         // Add the leaf to the container
//         container.appendChild(leaf);
//     }

//     // Function to spawn leaves at random intervals
//     function createLeaves() {
//         setInterval(createLeaf, 300); // Spawn a new leaf every 300ms
//     }

//     createLeaves();
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.querySelector('.leaves-container');

//     function createLeaf() {
//         const leaf = document.createElement('div');
//         leaf.classList.add('leaf');

//         leaf.style.left = `${Math.random() * 80}vw`;
//         leaf.style.animationDuration = `${Math.random() * 5 + 5}s`;
//         leaf.style.animationDelay = `${Math.random() * 2}s`;

//         document.addEventListener('mousemove', (event) => {
//             const rect = leaf.getBoundingClientRect();
//             const distanceX = event.clientX - (rect.left + rect.width / 2);
//             const distanceY = event.clientY - (rect.top + rect.height / 2);
//             const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

//             if (distance < 150) {

//                 const angle = Math.atan2(distanceY, distanceX);
//                 const pushX = Math.cos(angle) * 20; 
//                 const pushY = Math.sin(angle) * 20;

//                 leaf.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${Math.random() * 360}deg)`;
//                 leaf.style.transition = 'transform 0.2s ease-out';
//             } else {
//                 leaf.style.transform = '';
//                 leaf.style.transition = '';
//             }
//         });

//         leaf.addEventListener('animationend', () => {
//             leaf.remove();
//         });

//         container.appendChild(leaf);
//     }

//     function createLeaves() {
//         setInterval(createLeaf, 300);
//     }

//     createLeaves();
// });



document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.leaves-container');
    let audioContext = null; 
    let hoverSound;
    let userInteracted = false;

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');

        leaf.style.left = `${Math.random() * 100}vw`;
        leaf.style.animationDuration = `${Math.random() * 5 + 5}s`;

        container.appendChild(leaf);

        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    }

    function initializeAudio() {
        if (audioContext === null) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            hoverSound = new Audio('leaves-rustling-14633.mp3');
            hoverSound.loop = false; 
            console.log("AudioContext initialized and sound file loaded.");
        }
    }
    function playHoverSound() {
        if (!userInteracted) return;

        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('AudioContext resumed');
                hoverSound.play().catch((error) => {
                    console.error('Audio playback failed:', error);
                });
            });
        } else {
            hoverSound.play().catch((error) => {
                console.error('Audio playback failed:', error);
            });
        }
    }


    function swayLeaves(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const leaves = document.querySelectorAll('.leaf');

        leaves.forEach((leaf) => {
            const rect = leaf.getBoundingClientRect();
            const leafCenterX = rect.left + rect.width / 2;
            const leafCenterY = rect.top + rect.height / 2;

            const distanceX = mouseX - leafCenterX;
            const distanceY = mouseY - leafCenterY;

            const swayX = distanceX * 0.05; 
            const swayY = distanceY * 0.02; 

            leaf.style.transform = `translate(${swayX}px, ${swayY}px) rotate(${swayX / 2}deg)`;
        });

        playHoverSound(); 
    }

    document.addEventListener('mousemove', () => {
        if (!userInteracted) {
            userInteracted = true; 
            initializeAudio();
        }
    });

    document.addEventListener('mousemove', swayLeaves);

    function createLeaves() {
        setInterval(createLeaf, 300);
    }

    createLeaves();
});
