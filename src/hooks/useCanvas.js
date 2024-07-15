import { useEffect, useRef } from 'react';

const useCanvas = () => {
    const canvas = useRef(null);
    const glowImage = new Image();
    
    useEffect(() => {
        if (!canvas.current) {
            canvas.current = document.createElement('canvas');
        }
    }, []);

    const setDimensions = (width, height) => {
        canvas.current.width = width;
        canvas.current.height = height;
    }

    const getDimensions = () => { 
       const {  width, height } = canvas.current
       return { width, height }
     }

    const setStyles = (styles) => {
        Object.entries(styles).forEach(([key, value]) => {
            console.log(key, value)
            canvas.current.style[key] = value;
        })
    }

    const getContext = () => {
        return canvas.current.getContext('2d');
    }

    const loadImage = (url) => {
        glowImage.src = url        
    }


    return { ref: canvas,
        setDimensions, 
        setStyles, 
        loadImage,
        getContext,
        getDimensions
    };
}

export default useCanvas;
