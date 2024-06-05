// Background.tsx
import React from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from "tsparticles";
import { Engine, MoveDirection, OutMode } from '@tsparticles/engine';

const particlesOptions = {
  autoPlay: true,
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none" as MoveDirection,
      enable: true,
      outModes: {
        default: "bounce" as OutMode,
      },
      random: false,
      speed: 1,  // Slow speed for a calm effect
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 2, max: 4 },  // Minimal size changes
    },
  },
  detectRetina: true,
};

const Background: React.FC = () => {
  return (
    <Particles
      id="tsparticles"
      options={particlesOptions}
    />
  );
};

export default Background;
