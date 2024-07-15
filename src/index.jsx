import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function App() {
  return (
    <>
      {/* <canvas width={128} height={128}></canvas> */}
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 16],
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

root.render(<App />);
