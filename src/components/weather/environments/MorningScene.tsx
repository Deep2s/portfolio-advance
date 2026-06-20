import { Sky } from "@react-three/drei";

export default function MorningScene() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffeedd" />
      <directionalLight 
        position={[10, 5, -10]} 
        intensity={1.2} 
        color="#ffcc88" 
        castShadow 
      />
      
      <Sky 
        distance={450000} 
        sunPosition={[10, 0.5, -10]} 
        inclination={0.2} 
        azimuth={0.25} 
        mieCoefficient={0.005} 
        mieDirectionalG={0.8}
        rayleigh={2}
        turbidity={4}
      />
    </>
  );
}
