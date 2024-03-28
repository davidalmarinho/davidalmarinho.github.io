// Get the section element
    const section = document.getElementById('mainSection');

    // Function to create and append span elements with randomized positions and animation durations
    function createSpans(count) {
      const directions = ['n', 'ne', 'e']; // Allowed directions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        
        // Randomly select direction
        const direction = directions[Math.floor(Math.random() * directions.length)];

        // Calculate random positions based on direction
        let randomX, randomY;

        if (direction === 'n') {
          randomX = Math.random() * windowWidth;
          randomY = -20; // Above the screen
        } else if (direction === 'ne') {
          randomX = windowWidth + 20; // To the right of the screen
          randomY = Math.random() * -windowHeight;
        } else if (direction === 'e') {
          randomX = windowWidth + 20; // To the right of the screen
          randomY = Math.random() * windowHeight;
        }
        
        span.style.left = `${randomX}px`;
        span.style.top = `${randomY}px`;

        // Set random animation duration between 2 and 5 seconds
        const randomDuration = Math.random() * 3 + 2; // Range from 2 to 5 seconds
        span.style.animationDuration = `${randomDuration}s`;

        section.appendChild(span);
      }
    }

    // Call the function with desired number of spans to generate
    createSpans(10); // Change the number as needed