// Background Music Player
document.addEventListener('DOMContentLoaded', function () {
  // Wait for window load to ensure all resources are loaded
  window.addEventListener('load', function () {
    // Create audio element programmatically
    const bgMusic = new Audio();
    // Use a direct URL to your audio file
    bgMusic.src = ''; // add your music track link
    bgMusic.loop = true;
    bgMusic.volume = 0.2; // 20% volume (adjust as needed)

    // Try to play automatically (may not work in all browsers due to autoplay policies)
    const playPromise = bgMusic.play();

    // Handle autoplay restrictions
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented, we'll try again after user interaction
        console.log('Autoplay prevented:', error);

        // Set up a one-time interaction handler
        const handleUserInteraction = function () {
          bgMusic.play();
          // Remove the event listeners after first interaction
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
        };

        // Listen for various types of user interactions
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);
      });
    }
  });
});