<template>
    <div>
      <input type="file" @change="uploadFile" />
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  
  const canvas = ref(null);
  const uploadedFile = ref(null);
  
  const uploadFile = async (event) => {
    uploadedFile.value = event.target.files[0];
  
    if (!uploadedFile.value) {
      console.error("No file selected!");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', uploadedFile.value);
  
    try {
      // 🔹 Send image to backend via POST request
      const response = await axios.post('http://localhost:3000/clothing/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log("Upload successful:", response.data);
      const modelUrl = response.data.modelUrl;
      if (modelUrl) {
        loadModel(modelUrl);
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };
  
  const loadModel = (modelUrl) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    // 🔹 Load the 3D model dynamically
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
      animate();
    }, undefined, (error) => {
      console.error("Error loading 3D model:", error);
    });
  
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  };
  </script>
  