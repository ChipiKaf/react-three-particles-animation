import { OrbitControls, shaderMaterial } from "@react-three/drei";
import vertexShader from './shaders/particles/vertex.glsl';
import fragmentShader from './shaders/particles/fragment.glsl';
import * as THREE from 'three';
import { extend, useFrame } from "@react-three/fiber";
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
        uDisplacementTexture: new THREE.CanvasTexture()
    },
    vertexShader,
    fragmentShader
);

extend({ ParticlesMaterial });

export default function Experience() {
    const particlesMaterial = useRef();
    const particlesGeometry = useRef();
    const intensitiesArray = useRef(new Float32Array());
    const anglesArray = useRef(new Float32Array());

    const { interactivePlane, raycaster, screenCursor } = useInteractivePlane()
    const canvas = useCanvas()

    useFrame((state) => {
        raycaster.current.setFromCamera(screenCursor.current, state.camera)
        const intersections = raycaster.current.intersectObject(interactivePlane.current);
        if (intersections.length) {
            const { uv } = intersections[0]
            canvas.cursor.current.x = uv.x * canvas.getDimensions().width;
            canvas.cursor.current.y = (1 - uv.y) * canvas.getDimensions().width;
        }

        canvas.drawImage()
        canvas.texture.current.needsUpdate = true;
    });

    useEffect(() => {        
        if (!particlesGeometry.current) return
        const { count: particlesCount } = particlesGeometry.current.attributes.position

        particlesGeometry.current.setIndex(null);
        intensitiesArray.current = new Float32Array(particlesCount)
        anglesArray.current = new Float32Array(particlesCount)
   
        for (let i = 0; i < particlesCount; i++) {
            intensitiesArray.current[i] = Math.random();
            anglesArray.current[i] = Math.random() * Math.PI * 2;
        }

        particlesGeometry.current.setAttribute('aIntensity', new THREE.BufferAttribute(intensitiesArray.current, 1))
        particlesGeometry.current.setAttribute('aAngle', new THREE.BufferAttribute(intensitiesArray.current, 1))

    }, [particlesGeometry.current])

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

        canvas.createTexture() 
        document.body.append(canvas.ref.current);

        if (particlesMaterial.current) {
            particlesMaterial.current.uniforms.uDisplacementTexture.value = canvas.texture.current;
        }
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
                <meshBasicMaterial color={'red'} side={THREE.DoubleSide} />
            </mesh>
            <points>
                <planeGeometry ref={particlesGeometry} args={[10, 10, 128, 128]} />
                <particlesMaterial ref={particlesMaterial} />
            </points>
        </>
    );
}
