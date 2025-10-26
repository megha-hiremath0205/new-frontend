import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './trail.css';

const CampusTrail = () => {
  const canvasRef = useRef(null);
  const [buildingInfo, setBuildingInfo] = useState('');

  const buildingData = [
    { name: 'HOD', color: 0x87ceeb, position: [4, 0, -5], size: [2, 2.5, 2] },
    { name: 'Block 3', color: 0x7fffd4, position: [-3, 0, 1], size: [2, 1.2, 2] },
    { name: 'Block 4', color: 0xffd700, position: [4, 0, 1], size: [2.5, 1.2, 2.5] },
    { name: 'Block 2', color: 0x9fb6ff, position: [-3, 0, 5], size: [2, 1.2, 2] },
    { name: 'Block 1', color: 0xffb6c1, position: [4, 0, 5], size: [2, 1.2, 2] }
  ];

  const detailedBuildingData = {
    'HOD': { description: 'Administration and Head of Department offices.' },
    'Block 3': { description: 'Computer Science & Engineering Labs and Classrooms.' },
    'Block 4': { description: 'Physics & Chemistry Labs and Lecture Halls.' },
    'Block 2': { description: 'Electronics Engineering Classrooms.' },
    'Block 1': { description: 'First-Year Lecture Halls.' }
  };

  // --- Fetch occupancy from backend ---
  const getCurrentOccupancy = async (buildingName) => {
    try {
      const res = await fetch(`http://localhost:5000/api/status/${encodeURIComponent(buildingName)}`);
      const data = await res.json();
      if (data.error) return { isOccupied: false, subject: 'No Session', lecturer: 'N/A' };

      return data.status === "Occupied"
        ? { isOccupied: true, subject: data.subject, lecturer: data.lecturer }
        : { isOccupied: false, subject: data.next || "No Session", lecturer: "N/A" };
    } catch (err) {
      console.error(err);
      return { isOccupied: false, subject: "No Session", lecturer: "N/A" };
    }
  };

  // --- Three.js ---
  useEffect(() => {
    let scene, camera, renderer, raycaster, mouse;
    let buildings = [];
    let hoveredBuilding = null;
    let animationFrameId;

    const cameraAngle = { theta: 0, phi: Math.PI/4 };
    let cameraDistance = 15;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a1929);

      camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.set(5, 10, 5);
      light.castShadow = true;
      scene.add(light);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.MeshStandardMaterial({ color: 0x1a3a52 })
      );
      ground.rotation.x = -Math.PI/2;
      scene.add(ground);

      buildingData.forEach((data) => {
        const group = new THREE.Group();
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(...data.size),
          new THREE.MeshStandardMaterial({ color: data.color })
        );
        mesh.position.y = data.size[1]/2;
        group.add(mesh);

        // Label
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0,0,256,64);
        ctx.fillStyle = 'white'; ctx.font='bold 28px Arial'; ctx.textAlign='center';
        ctx.fillText(data.name, 128, 40);
        const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent:true }));
        label.position.y = data.size[1]+0.6; label.scale.set(3,1,1); group.add(label);

        group.position.set(...data.position);
        group.userData = { ...data, mesh };
        buildings.push(group);
        scene.add(group);
      });

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      updateCameraPosition();
      animate();
    };

    const updateCameraPosition = () => {
      camera.position.x = cameraDistance * Math.sin(cameraAngle.phi) * Math.cos(cameraAngle.theta);
      camera.position.y = cameraDistance * Math.cos(cameraAngle.phi);
      camera.position.z = cameraDistance * Math.sin(cameraAngle.phi) * Math.sin(cameraAngle.theta);
      camera.lookAt(0, 0, 0);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left)/rect.width)*2 - 1;
      mouse.y = -((event.clientY - rect.top)/rect.height)*2 + 1;
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildings.map(b => b.userData.mesh));

      if (hoveredBuilding && (!intersects.length || hoveredBuilding.userData.mesh !== intersects[0].object)) {
        hoveredBuilding.userData.mesh.material.color.setHex(hoveredBuilding.userData.color);
        hoveredBuilding = null;
        setBuildingInfo('');
      }

      if (intersects.length > 0) {
        const b = buildings.find(b => b.userData.mesh === intersects[0].object);
        if (b !== hoveredBuilding) {
          hoveredBuilding = b;
          b.userData.mesh.material.color.setHex(0xffffff);
          getCurrentOccupancy(b.userData.name).then(occupancy => {
            setBuildingInfo(`
              <div>
                <h3>${b.userData.name}</h3>
                <p style="font-size:12px;">${detailedBuildingData[b.userData.name]?.description || ""}</p>
                <p style="color:${occupancy.isOccupied ? '#ff4d4d' : '#7fffd4'}">
                  ${occupancy.isOccupied ? 'Occupied 🔴' : 'Free 🟢'}
                </p>
                <p><strong>Subject:</strong> ${occupancy.subject}</p>
                <p><strong>Lecturer:</strong> ${occupancy.lecturer}</p>
              </div>
            `);
          });
        }
      }

      renderer.render(scene, camera);
    };

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width:'100vw', height:'100vh', position:'relative' }}>
      <canvas ref={canvasRef} />
      <div className="building-info" dangerouslySetInnerHTML={{ __html: buildingInfo }} />
    </div>
  );
};

export default CampusTrail;
