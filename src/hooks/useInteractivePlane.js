import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const useInteractivePlane = () => {
  const interactivePlane = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const screenCursor = useRef(new THREE.Vector2(9999, 9999));
  
  useEffect(() => {
    const handlePointerMove = (event) => {
        screenCursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        screenCursor.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('pointermove', handlePointerMove)
    interactivePlane.current.visible = false
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return {
    interactivePlane,
    raycaster,
    screenCursor
  };
};

export default useInteractivePlane;