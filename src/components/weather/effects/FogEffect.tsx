export default function FogEffect({ intensity }: { intensity: number }) {
  // Use React Three Fiber's fog component attached to the scene
  // Intensity determines the near/far values
  const near = 2;
  const far = Math.max(5, 30 - intensity * 20); // Denser fog = lower far distance

  return <fog attach="fog" args={["#aaaaaa", near, far]} />;
}
