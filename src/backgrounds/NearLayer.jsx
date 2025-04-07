import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useScroll } from '../context/ScrollContext';

const NearLayer = ({ config }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  const [activeSceneId, setActiveSceneId] = useState(null);
  const { scrollPercent } = useScroll();
  
  // Initialize Three.js renderer, scene, and camera
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Create scene and camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near plane
      1000 // Far plane
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Enable transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Update any animations
      if (sceneRef.current) {
        // Animate all objects with rotation data
        sceneRef.current.traverse((object) => {
          if (object.userData.rotateSpeed) {
            if (object.userData.rotateSpeed.x) {
              object.rotation.x += object.userData.rotateSpeed.x;
            }
            if (object.userData.rotateSpeed.y) {
              object.rotation.y += object.userData.rotateSpeed.y;
            }
            if (object.userData.rotateSpeed.z) {
              object.rotation.z += object.userData.rotateSpeed.z;
            }
          }
        });
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  // Update 3D content based on scroll position
  useEffect(() => {
    if (!config || !config.scenes || !sceneRef.current) return;
    
    // Find the current scene based on scroll position
    let currentScene = null;
    for (const scene of config.scenes) {
      if (scrollPercent >= scene.startAt && scrollPercent <= scene.endAt) {
        currentScene = scene;
        break;
      }
    }
    
    // If no scene should be active or it's the same scene, do nothing
    if (!currentScene || currentScene.id === activeSceneId) return;
    
    // Clear previous scene objects
    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {
        const object = sceneRef.current.children[0];
        sceneRef.current.remove(object);
      }
    }
    
    // Load new scene objects based on current scroll position
    const loadSceneContent = () => {
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      sceneRef.current.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      sceneRef.current.add(directionalLight);
      
      // Create objects based on scene type
      switch (currentScene.type) {
        case 'geometric':
          // Create some basic geometric shapes
          const geometry = new THREE.IcosahedronGeometry(1, 0);
          const material = new THREE.MeshStandardMaterial({ 
            color: currentScene.color || 0x44aaff,
            wireframe: currentScene.wireframe || false,
            transparent: true,
            opacity: 0.8
          });
          
          for (let i = 0; i < (currentScene.count || 10); i++) {
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            // Position randomly in space
            mesh.position.set(
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            );
            
            // Random scale
            const scale = 0.3 + Math.random() * 0.7;
            mesh.scale.set(scale, scale, scale);
            
            // Add to scene
            sceneRef.current.add(mesh);
            
            // Add animation
            mesh.userData.rotateSpeed = {
              x: (Math.random() - 0.5) * 0.02,
              y: (Math.random() - 0.5) * 0.02,
              z: (Math.random() - 0.5) * 0.02
            };
          }
          break;
          
        case 'particles':
          // Create a particle system
          const particleCount = currentScene.count || 1000;
          const particlesGeometry = new THREE.BufferGeometry();
          const particlePositions = new Float32Array(particleCount * 3);
          
          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            particlePositions[i3] = (Math.random() - 0.5) * 10;
            particlePositions[i3 + 1] = (Math.random() - 0.5) * 10;
            particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;
          }
          
          particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
          
          const particlesMaterial = new THREE.PointsMaterial({
            color: currentScene.color || 0xffffff,
            size: currentScene.particleSize || 0.05,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
          });
          
          const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
          sceneRef.current.add(particleSystem);
          break;
          
        case 'text':
          // In a real implementation, you'd use a library like troika-three-text
          // For this example, we'll just use a placeholder cube
          const textPlaceholder = new THREE.Mesh(
            new THREE.BoxGeometry(4, 1, 0.2),
            new THREE.MeshStandardMaterial({ color: currentScene.color || 0xffffff })
          );
          sceneRef.current.add(textPlaceholder);
          
          // Add animation
          textPlaceholder.userData.rotateSpeed = {
            y: 0.01
          };
          break;
          
        default:
          // Default scene with a simple cube
          const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
          );
          sceneRef.current.add(cube);
          
          // Add animation
          cube.userData.rotateSpeed = {
            x: 0.01,
            y: 0.01
          };
      }
      
      // Update camera position if specified in current scene
      if (currentScene.camera) {
        cameraRef.current.position.set(
          currentScene.camera.x || 0,
          currentScene.camera.y || 0,
          currentScene.camera.z || 5
        );
        
        // Look at center by default
        cameraRef.current.lookAt(0, 0, 0);
      }
    };
    
    loadSceneContent();
    setActiveSceneId(currentScene.id);
    
  }, [config, scrollPercent, activeSceneId]);
  
  return (
    <div 
      ref={mountRef} 
      className="near-layer" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none'
      }} 
    />
  );
};

export default NearLayer;