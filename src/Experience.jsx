import { OrbitControls, shaderMaterial } from "@react-three/drei";
import vertexShader from './shaders/particles/vertex.glsl';
import fragmentShader from './shaders/particles/fragment.glsl';
import * as THREE from 'three';
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from 'react';
import useCanvas from "./hooks/useCanvas";
import useInteractivePlane from "./hooks/useInteractivePlane";

let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
};
const updateSizes = () => {
    sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    };
    return sizes;  
}

const textureLoader = new THREE.TextureLoader()

const ParticlesMaterial = shaderMaterial(
    {
        uResolution: new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio),
        uPictureTexture: textureLoader.load('./picture-1.png'),
    },
    vertexShader,
    fragmentShader
);

extend({ ParticlesMaterial });

export default function Experience() {
    const particlesMaterial = useRef();
    const { interactivePlane, raycaster, screenCursor } = useInteractivePlane()
    const canvas = useCanvas()

    useFrame((state) => {
        raycaster.current.setFromCamera(screenCursor, state.camera)
        const intersections = raycaster.current.intersectObject(interactivePlane.current);
        if (intersections.length) {
            console.log(intersections[0])
        }
    });

    useEffect(() => {
        if (!canvas.ref) return;
        
        canvas.setDimensions(128, 128);
        
        canvas.setStyles({ position: 'fixed', 
            width: '512px', 
            height: '512px',
            inset: 0,
            zIndex: 10

        })

        const { width, height } = canvas.getDimensions();
        
        
        canvas.getContext().fillRect(0, 0, width, height );

        canvas.loadImage('glow.png')

        document.body.append(canvas.ref.current);
      }, [canvas.ref.current]);
    
    useEffect(() => {
        const handleResize = () => {
            const { height, width, pixelRatio} = updateSizes();    
            if (particlesMaterial.current) {
                particlesMaterial.current
                .uniforms
                .uResolution
                .value
                .set(width * pixelRatio, height * pixelRatio)
            }
        }
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <>
            <OrbitControls makeDefault />
            <mesh ref={interactivePlane}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color={'red'} />
            </mesh>
            <points>
                <planeGeometry args={[10, 10, 128, 128]} />
                <particlesMaterial ref={particlesMaterial} />
            </points>
        </>
    );
}
