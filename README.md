# React Three Particles Animation

This project creates a particle animation effect using React, Three.js, and `@react-three/fiber`. As you move the cursor across the image, particles animate to create a visual effect.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Demo

[Link to live demo]()

## Features

- Particle animation based on cursor movement
- Dynamic particle intensity and angles
- Customizable canvas and particle properties

## Installation

1. Clone the repository:

    ```git clone https://github.com/your-username/react-three-particles-animation.git
        cd react-three-particles-animation```

2. Install dependencies:

    ```npm install```

## Usage

1. Start the development server:

      ```npm run dev```

2. Open your browser and navigate to `http://localhost:3000` to see the particle animation in action.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.

## Project Structure

      .
      ├── public
      │   └── ... (static assets)
      ├── src
      │   ├── hooks
      │   │   ├── useCanvas.js
      │   │   └── useInteractivePlane.js
      │   ├── shaders
      │   │   ├── particles
      │   │   │   ├── fragment.glsl
      │   │   │   └── vertex.glsl
      │   ├── components
      │   │   └── Experience.jsx
      │   ├── App.jsx
      │   └── main.jsx
      ├── package.json
      ├── vite.config.js
      └── README.md

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Three.js**: A JavaScript 3D library.
- **@react-three/fiber**: React renderer for Three.js.
- **@react-three/drei**: Useful helpers for `@react-three/fiber`.
- **Vite**: A build tool that aims to provide a faster and leaner development experience.

## License

This project is licensed under the MIT License.
