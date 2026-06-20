import { Stars } from "@react-three/drei";

export default function NightScene({ showStars }: { showStars: boolean }) {
  return (
    <>
      {/* Dim ambient light for night */}
      <ambientLight intensity={0.1} color="#001133" />
      
      {/* Moon directional light */}
      <directionalLight 
        position={[5, 10, -5]} 
        intensity={0.5} 
        color="#88aaff" 
      />

      {/* Deep blue/black background */}
      <color attach="background" args={["#030712"]} />

      {/* Stars */}
      {showStars && (
        <Stars 
          radius={100} 
          depth={50} 
          count={7000} 
          factor={3} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
      )}
    </>
  );
}
