import { useEffect, useRef } from "react";
import * as THREE from 'three'

const useCanvas = () => {
  const canvas = useRef(null);
  const cursor = useRef(new THREE.Vector2(9999, 9999));
  const cursorPrevious = useRef(new THREE.Vector2(9999, 9999))
  const glowImage = new Image();
  const texture = useRef()

  useEffect(() => {
    if (!canvas.current) {
      canvas.current = document.createElement("canvas");
    }
  }, []);
  const getContext = () => {
    return canvas.current.getContext("2d");
  };


  const loadImage = (url) => {
    glowImage.src = url;
  };

  const setDimensions = (width, height) => {
    canvas.current.width = width;
    canvas.current.height = height;
  };

  const getDimensions = () => {
    const { width, height } = canvas.current;
    return { width, height };
  };

  const drawImage = () => {
    const context = getContext();
    
    const { width, height } = getDimensions()

    const cursorDistance = cursorPrevious.current.distanceTo(cursor.current)

    cursorPrevious.current.copy(cursor.current)

    const alpha = Math.min(cursorDistance * .05, 1)

    context.globalCompositeOperation = "source-over";
    
    context.globalAlpha = .02

    context.fillRect(0, 0, width, height)

    context.globalCompositeOperation = "lighten";
 
    const glowSize = width * 0.25;
    context.globalAlpha = alpha
    context.drawImage(glowImage, 
        cursor.current.x - glowSize * .5, 
        cursor.current.y - glowSize * .5, 
        glowSize, 
        glowSize);
  };

  const createTexture = () => {
    texture.current = new THREE.CanvasTexture(canvas.current);
  }

  const setStyles = (styles) => {
    Object.entries(styles).forEach(([key, value]) => {
      canvas.current.style[key] = value;
    });
  };

  return {
    ref: canvas,
    cursor,
    cursorPrevious,
    createTexture,
    drawImage,
    createTexture,
    getContext,
    getDimensions,
    loadImage,
    setDimensions,
    setStyles,
    texture,
  };
};

export default useCanvas;
