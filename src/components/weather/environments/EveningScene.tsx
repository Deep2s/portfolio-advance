import { Sky } from "@react-three/drei";

export default function EveningScene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#ff9955" />
      <directionalLight 
        position={[-10, 2, -10]} 
        intensity={1.0} 
        color="#ff7733" 
        castShadow 
      />
      
      <Sky 
        distance={450000} 
        sunPosition={[-10, 0.1, -10]} 
        inclination={0.6} 
        azimuth={0.5} 
        mieCoefficient={0.005} 
        mieDirectionalG={0.9}
        rayleigh={4}
        turbidity={10}
      />
    </>
  );
}
