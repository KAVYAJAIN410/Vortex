"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function SponsorCard({ modelPath, name }) {
  const { scene } = useGLTF(modelPath);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex items-center space-x-6">
      <div className="w-32 h-32">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} />
          <primitive object={scene} scale={1} />
          <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
        </Canvas>
      </div>
      <h2 className="text-white text-2xl font-semibold">{name}</h2>
    </div>
  );
}
