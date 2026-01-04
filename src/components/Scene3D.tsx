import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingSphere = ({ position, color, speed = 1, size = 1 }: { position: [number, number, number]; color: string; speed?: number; size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Sphere>
    </Float>
  );
};

const FloatingBox = ({ position, color, size = 1.5 }: { position: [number, number, number]; color: string; size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Box ref={meshRef} args={[size, size, size]} position={position}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Box>
    </Float>
  );
};

const FloatingTorus = ({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1.5} floatIntensity={2}>
      <Torus ref={meshRef} args={[size, size * 0.4, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
};

const GlowingRing = ({ position, color, size = 2 }: { position: [number, number, number]; color: string; size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Torus ref={meshRef} args={[size, 0.02, 16, 100]} position={position}>
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </Torus>
  );
};

const ParticleField = () => {
  const count = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00e5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ScrollResponsive = () => {
  const { camera } = useThree();
  
  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;
    
    camera.position.z = 8 + scrollProgress * 5;
    camera.position.y = scrollProgress * 2;
    camera.rotation.x = -scrollProgress * 0.1;
  });

  return null;
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ScrollResponsive />
          
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00e5ff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffc107" />
          <pointLight position={[0, 5, 5]} intensity={1} color="#00e5ff" distance={20} />
          <pointLight position={[-5, -5, 3]} intensity={0.5} color="#ffc107" distance={15} />
          
          <FloatingSphere position={[-4, 2, -2]} color="#00e5ff" speed={0.8} size={1} />
          <FloatingSphere position={[4, -1, -3]} color="#ffc107" speed={1.2} size={0.8} />
          <FloatingSphere position={[0, 3, -5]} color="#00e5ff" speed={0.6} size={0.5} />
          <FloatingBox position={[3, 2, -4]} color="#00e5ff" size={1} />
          <FloatingBox position={[-5, -2, -6]} color="#ffc107" size={0.8} />
          <FloatingTorus position={[-3, -2, -2]} color="#ffc107" size={0.8} />
          <FloatingTorus position={[5, 1, -5]} color="#00e5ff" size={0.6} />
          
          <GlowingRing position={[0, 0, -3]} color="#00e5ff" size={3} />
          <GlowingRing position={[0, 0, -5]} color="#ffc107" size={4} />
          
          <ParticleField />
          <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          
          <fog attach="fog" args={['#0a0c10', 8, 30]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
