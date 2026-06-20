import { Sky } from "@react-three/drei";

export default function AfternoonScene() {
  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight 
        position={[0, 10, -5]} 
        intensity={1.5} 
        color="#ffffff" 
        castShadow 
      />
      
      <Sky 
        distance={450000} 
        sunPosition={[0, 10, 5]} 
        inclination={0.49} 
        azimuth={0.25} 
        mieCoefficient={0.001} 
        mieDirectionalG={0.7}
        rayleigh={4}
        turbidity={0.2}
      />
    </>
  );
}
