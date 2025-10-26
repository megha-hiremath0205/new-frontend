import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './trail.css';

const CampusTrail = () => {
    const canvasRef = useRef(null);
    const [buildingInfo, setBuildingInfo] = useState('');
    
    // Building data
    const buildingData = [
        { name: 'HOD', color: 0x87ceeb, position: [4, 0, -5], size: [2, 2.5, 2] },
        { name: 'Block 3', color: 0x7fffd4, position: [-3, 0, 1], size: [2, 1.2, 2] },
        { name: 'Block 4', color: 0xffd700, position: [4, 0, 1], size: [2.5, 1.2, 2.5] },
        { name: 'Block 2', color: 0x9fb6ff, position: [-3, 0, 5], size: [2, 1.2, 2] },
        { name: 'Block 1', color: 0xffb6c1, position: [4, 0, 5], size: [2, 1.2, 2] }
    ];

    const detailedBuildingData = {
        'HOD': {
            description: 'Administration and Head of Department offices.',
            timetable: [
                { subject: 'Principal Meeting', lecturer: 'Dr. Principal', day: 1, start: 9, end: 11 },
                { subject: 'Admissions Inquiry', lecturer: 'Ms. Secretary', day: 3, start: 14, end: 16 }
            ]
        },
        'Block 3': {
            description: 'Computer Science & Engineering Labs and Classrooms.',
            timetable: [
                { subject: 'Computer Networks (BCS402)', lecturer: 'Prof.Bhagath Inamdar', day: 1, start: 9, end: 10 },
                { subject: 'Theory of Computation (BCS503)', lecturer: 'Prof.Suman Y', day: 1, start: 10, end: 11 },
                { subject: 'Software Engineering And Project Management (BCS501)', lecturer: 'Prof.Sunita Kallu', day: 1, start: 11.25, end: 12.25 },
                { subject: 'Research Methodology and IPR (BRMK557)', lecturer: 'Dr. V.H.Naik', day: 1, start: 12.25, end: 13.25 },
                { subject: 'Theory of Computation(BCS503)', lecturer: 'Prof.Suman Y', day: 2, start: 9, end: 10 },
                { subject: 'Unix System Programming (BCS515C)', lecturer: 'Prof.Farzana Nadaf', day: 2, start: 10, end: 11 },
                { subject: 'T & P', day: 2, start: 11.25, end: 12.25 },
                { subject: 'Computer Networks(BCS502)', lecturer: 'Prof.Bhagat Inamdra', day: 2, start: 12.25, end: 13.25 },
                { subject: 'Unix System Programming (BCS515C)', lecturer: 'Prof.Farzana Nadaf', day: 3, start: 9, end: 10 },
                { subject: 'Research Methodology and IPR (BRMK557)', lecturer: 'Dr. V.H.Naik', day: 3, start: 10, end: 11 },
                { subject: 'Theory of Computation(BCS503)', lecturer: 'Prof.Suman Y', day: 3, start: 11.25, end: 12.25 },
                { subject: 'Software Engineering And Project Management (BCS501)', lecturer: 'Prof.Sunita Kallu', day: 3, start: 12.25, end: 13.25 },
                { subject: 'Software Engineering And Project Management (BCS501)', lecturer: 'Prof.Sunita Kallu', day: 5, start: 14, end: 16 }
            ]
        },
        'Block 4': {
            description: 'Physics & Chemistry Labs and Lecture Halls.',
            timetable: [
                { subject: 'Quantum Physics', lecturer: 'Dr. Bose', day: 2, start: 11, end: 13 }
            ]
        },
        'Block 2': {
            description: 'Electronics Engineering Classrooms.',
            timetable: [
                { subject: 'Circuit Theory (Lab)', lecturer: 'Prof. Kumar', day: 4, start: 15, end: 17 }
            ]
        },
        'Block 1': {
            description: 'First-Year Lecture Halls.',
            timetable: [
                { subject: 'Engineering Maths', lecturer: 'Dr. Rathi', day: 1, start: 13, end: 14 }
            ]
        }
    };

    // Format time from decimal to HH:MM
    const formatTime = (time) => {
        if (typeof time === 'number') {
            const hours = Math.floor(time);
            const minutes = Math.round((time - hours) * 60);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
        return time;
    };

    // Get current day and time
    const getCurrentSchedule = (buildingName) => {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentTime = now.getHours() + now.getMinutes() / 60;
        
        const timetable = detailedBuildingData[buildingName].timetable;
        
        // Find classes happening right now (current day and within current time)
        const currentClasses = timetable.filter(item => 
            item.day === currentDay && 
            currentTime >= item.start && 
            currentTime <= item.end
        );

        // If no current classes, find next class today
        let nextClass = null;
        if (currentClasses.length === 0) {
            const todayClasses = timetable.filter(item => 
                item.day === currentDay && 
                item.start > currentTime
            ).sort((a, b) => a.start - b.start);
            
            nextClass = todayClasses.length > 0 ? todayClasses[0] : null;
        }

        return { currentClasses, nextClass };
    };

    // Generate current schedule HTML for a building
    const generateCurrentScheduleHTML = (buildingName) => {
        const { currentClasses, nextClass } = getCurrentSchedule(buildingName);
        const now = new Date();
        const currentTime = now.getHours() + now.getMinutes() / 60;
        
        let html = '<div class="current-schedule">';
        
        if (currentClasses.length > 0) {
            html += '<div class="schedule-status current">';
            html += '<h4 style="color: #4CAF50; margin-bottom: 10px;">📚 Class in Session</h4>';
            
            currentClasses.forEach(cls => {
                const progress = ((currentTime - cls.start) / (cls.end - cls.start)) * 100;
                html += `<div class="current-class">
                    <div class="class-header">
                        <strong>${cls.subject}</strong>
                        <span class="time-badge">Now</span>
                    </div>
                    ${cls.lecturer ? `<div class="lecturer">👨‍🏫 ${cls.lecturer}</div>` : ''}
                    <div class="class-time">${formatTime(cls.start)} - ${formatTime(cls.end)}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(progress, 100)}%"></div>
                    </div>
                </div>`;
            });
            html += '</div>';
        } else if (nextClass) {
            html += '<div class="schedule-status upcoming">';
            html += '<h4 style="color: #FF9800; margin-bottom: 10px;">⏰ Next Class Today</h4>';
            
            const timeUntil = nextClass.start - currentTime;
            const hoursUntil = Math.floor(timeUntil);
            const minutesUntil = Math.round((timeUntil - hoursUntil) * 60);
            
            html += `<div class="next-class">
                <div class="class-header">
                    <strong>${nextClass.subject}</strong>
                    <span class="time-badge">in ${hoursUntil > 0 ? `${hoursUntil}h ` : ''}${minutesUntil}m</span>
                </div>
                ${nextClass.lecturer ? `<div class="lecturer">👨‍🏫 ${nextClass.lecturer}</div>` : ''}
                <div class="class-time">${formatTime(nextClass.start)} - ${formatTime(nextClass.end)}</div>
            </div>`;
            html += '</div>';
        } else {
            html += '<div class="schedule-status no-class">';
            html += '<h4 style="color: #757575; margin-bottom: 10px;">✅ No More Classes Today</h4>';
            html += '<p style="font-size: 12px; color: #aaa;">All classes for today have ended.</p>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    };

    useEffect(() => {
        let scene, camera, renderer, raycaster, mouse;
        let buildings = [];
        let isDragging = false;
        let prevMouseX = 0;
        let prevMouseY = 0;
        let cameraAngle = { theta: 0, phi: Math.PI / 4 };
        let cameraDistance = 15;
        let hoveredBuilding = null;
        let showDebug = false;
        let activePointerId = null;
        let animationFrameId;

        const init = () => {
            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0a1929);
            scene.fog = new THREE.Fog(0x0a1929, 10, 30);

            // Camera
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            // Renderer
            renderer = new THREE.WebGLRenderer({ 
                canvas: canvasRef.current, 
                antialias: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Raycaster and Mouse
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 10, 5);
            directionalLight.castShadow = true;
            directionalLight.shadow.camera.left = -10;
            directionalLight.shadow.camera.right = 10;
            directionalLight.shadow.camera.top = 10;
            directionalLight.shadow.camera.bottom = -10;
            scene.add(directionalLight);

            // Ground and Roads
            const roadGroup = new THREE.Group();
            
            // Main roads
            const mainRoad1 = new THREE.Mesh(
                new THREE.PlaneGeometry(20, 3),
                new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.9 })
            );
            mainRoad1.rotation.x = -Math.PI / 2;
            mainRoad1.receiveShadow = true;
            roadGroup.add(mainRoad1);

            const mainRoad2 = new THREE.Mesh(
                new THREE.PlaneGeometry(3, 20),
                new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.9 })
            );
            mainRoad2.rotation.x = -Math.PI / 2;
            mainRoad2.receiveShadow = true;
            roadGroup.add(mainRoad2);

            // Ground
            const ground = new THREE.Mesh(
                new THREE.PlaneGeometry(30, 30),
                new THREE.MeshStandardMaterial({ color: 0x1a3a52, roughness: 1 })
            );
            ground.rotation.x = -Math.PI / 2;
            ground.position.y = -0.01;
            ground.receiveShadow = true;
            scene.add(ground);
            
            scene.add(roadGroup);

            // Create buildings
            buildingData.forEach(data => {
                const building = createBuilding(data);
                buildings.push(building);
                scene.add(building);
            });

            updateCameraPosition();
            setupEventListeners();
            animate();
        };

        const createBuilding = (data) => {
            const group = new THREE.Group();
            
            const geometry = new THREE.BoxGeometry(data.size[0], data.size[1], data.size[2]);
            const material = new THREE.MeshStandardMaterial({ 
                color: data.color,
                roughness: 0.7,
                metalness: 0.3
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = data.size[1] / 2;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            // Create label
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 128;
            
            // Label background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Label border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 4;
            ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
            
            // Label text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(data.name, 256, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            const labelMaterial = new THREE.SpriteMaterial({ 
                map: texture,
                transparent: true,
                depthTest: false,
                depthWrite: false
            });
            const label = new THREE.Sprite(labelMaterial);
            label.position.y = data.size[1] + 0.8;
            label.scale.set(3, 0.75, 1);
            label.renderOrder = 999;
            
            group.add(mesh);
            group.add(label);
            group.position.set(data.position[0], data.position[1], data.position[2]);
            
            group.userData = { 
                name: data.name, 
                originalColor: data.color,
                originalY: data.position[1],
                mesh: mesh,
                label: label
            };
            
            return group;
        };

        const updateCameraPosition = () => {
            camera.position.x = cameraDistance * Math.sin(cameraAngle.phi) * Math.cos(cameraAngle.theta);
            camera.position.y = cameraDistance * Math.cos(cameraAngle.phi);
            camera.position.z = cameraDistance * Math.sin(cameraAngle.phi) * Math.sin(cameraAngle.theta);
            camera.lookAt(0, 0, 0);
        };

        const setupEventListeners = () => {
            const canvas = renderer.domElement;
            
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            const setMouseFromEvent = (e) => {
                const rect = renderer.domElement.getBoundingClientRect();
                mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            };

            const onPointerDown = (e) => {
                if (!e.isPrimary) return;
                e.preventDefault();
                activePointerId = e.pointerId;
                isDragging = true;
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
                renderer.domElement.classList.add('dragging');
                renderer.domElement.setPointerCapture(e.pointerId);
                setMouseFromEvent(e);
            };

            const onPointerMove = (e) => {
                if (!e.isPrimary) return;
                setMouseFromEvent(e);
                if (isDragging && e.pointerId === activePointerId) {
                    e.preventDefault();
                    const deltaX = e.clientX - prevMouseX;
                    const deltaY = e.clientY - prevMouseY;
                    cameraAngle.theta -= deltaX * 0.005;
                    cameraAngle.phi -= deltaY * 0.005;
                    cameraAngle.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngle.phi));
                    updateCameraPosition();
                    prevMouseX = e.clientX;
                    prevMouseY = e.clientY;
                }
            };

            const onPointerUpCancel = (e) => {
                if (!e.isPrimary) return;
                isDragging = false;
                activePointerId = null;
                renderer.domElement.classList.remove('dragging');
                try { 
                    renderer.domElement.releasePointerCapture(e.pointerId); 
                } catch(_) {}
            };

            const onWheel = (e) => {
                e.preventDefault();
                cameraDistance += e.deltaY * 0.01;
                cameraDistance = Math.max(5, Math.min(30, cameraDistance));
                updateCameraPosition();
            };

            const onKeyDown = (e) => {
                if (e.key === 'r' || e.key === 'R') {
                    cameraAngle.theta = 0;
                    cameraAngle.phi = Math.PI / 4;
                    cameraDistance = 15;
                    updateCameraPosition();
                }
                if (e.key === 'd' || e.key === 'D') {
                    showDebug = !showDebug;
                }
            };

            window.addEventListener('resize', handleResize);
            canvas.addEventListener('pointerdown', onPointerDown);
            canvas.addEventListener('pointermove', onPointerMove);
            canvas.addEventListener('pointerup', onPointerUpCancel);
            canvas.addEventListener('pointercancel', onPointerUpCancel);
            canvas.addEventListener('wheel', onWheel, { passive: false });
            window.addEventListener('keydown', onKeyDown);

            // Cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
                canvas.removeEventListener('pointerdown', onPointerDown);
                canvas.removeEventListener('pointermove', onPointerMove);
                canvas.removeEventListener('pointerup', onPointerUpCancel);
                canvas.removeEventListener('pointercancel', onPointerUpCancel);
                canvas.removeEventListener('wheel', onWheel);
                window.removeEventListener('keydown', onKeyDown);
            };
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Raycasting for hover
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(buildings.map(b => b.children[0]));

            // Reset previous hover
            if (hoveredBuilding && (!intersects.length || intersects[0].object !== hoveredBuilding.children[0])) {
                hoveredBuilding.children[0].material.color.setHex(hoveredBuilding.userData.originalColor);
                hoveredBuilding.position.y = hoveredBuilding.userData.originalY;
                hoveredBuilding = null;
                setBuildingInfo('');
            }

            // Apply hover effect
            if (intersects.length > 0) {
                const building = buildings.find(b => b.children[0] === intersects[0].object);
                
                if (building && building !== hoveredBuilding) {
                    hoveredBuilding = building;
                    building.children[0].material.color.setHex(0xffffff);
                    building.position.y = building.userData.originalY + 0.3;
                    
                    // Generate current schedule for this building
                    const scheduleHTML = generateCurrentScheduleHTML(building.userData.name);
                    
                    setBuildingInfo(`
                        <div class="building-info">
                            <h3>${building.userData.name}</h3>
                            <p class="building-description">${detailedBuildingData[building.userData.name].description}</p>
                            
                            <div class="current-schedule-section">
                                <h4>Current Schedule</h4>
                                ${scheduleHTML}
                            </div>
                        </div>
                    `);
                }
            }

            // Make labels face camera
            buildings.forEach(b => {
                if (b.userData.label) b.userData.label.quaternion.copy(camera.quaternion);
            });

            // Debug overlay
            if (showDebug) {
                const debugText = `Camera: θ=${(cameraAngle.theta * 180 / Math.PI).toFixed(1)}° φ=${(cameraAngle.phi * 180 / Math.PI).toFixed(1)}° dist=${cameraDistance.toFixed(1)}`;
                let debugOverlay = document.getElementById('debugOverlay');
                if (!debugOverlay) {
                    debugOverlay = document.createElement('div');
                    debugOverlay.id = 'debugOverlay';
                    debugOverlay.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:white;background:rgba(0,0,0,0.7);padding:10px;border-radius:5px;font-family:monospace;font-size:12px;pointer-events:none;z-index:100;';
                    document.body.appendChild(debugOverlay);
                }
                debugOverlay.textContent = debugText;
            } else {
                const overlay = document.getElementById('debugOverlay');
                if (overlay) overlay.remove();
            }

            renderer.render(scene, camera);
        };

        // Initialize Three.js
        init();

        // Cleanup function
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (renderer) {
                renderer.dispose();
            }
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <canvas 
                ref={canvasRef} 
                style={{ 
                    display: 'block', 
                    width: '100%', 
                    height: '100vh',
                    cursor: 'grab'
                }}
            />
            
            {/* Header */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'white',
                zIndex: 10,
                background: 'rgba(10, 25, 41, 0.9)',
                padding: '15px 20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)'
            }}>
                <h2 style={{ fontSize: '20px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🏛️ Virtual Campus Navigator
                </h2>
                <p style={{ fontSize: '12px', color: '#88c0ff' }}>Professional campus layout</p>
                <p style={{ fontSize: '11px', marginTop: '5px' }}>
                    Hover buildings to inspect current schedule — left-drag to rotate, scroll to zoom
                </p>
            </div>

            {/* Controls */}
            <div className="controls-container" style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                color: 'white',
                zIndex: 10,
                background: 'rgba(10, 25, 41, 0.9)',
                padding: '15px 20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                maxWidth: '400px'
            }}>
                <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#88c0ff' }}>Controls:</h3>
                
                <div style={{ fontSize: '12px', margin: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#4a90e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>🖱️</div>
                    <span>Left click + drag: Rotate view (360°)</span>
                </div>
                
                <div style={{ fontSize: '12px', margin: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#4a90e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>🖱️</div>
                    <span>Scroll: Zoom in/out</span>
                </div>
                
                <div style={{ fontSize: '12px', margin: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#4a90e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>🖱️</div>
                    <span>Hover: Inspect buildings (rise up + highlight)</span>
                </div>
                
                <div style={{ fontSize: '12px', margin: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#e24a4a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>R</div>
                    <span>Press R to reset top-down view</span>
                </div>
                
                <div style={{ fontSize: '12px', margin: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#e24a4a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>D</div>
                    <span>Press D to toggle debug overlay — shows camera & rotation values</span>
                </div>
            </div>

            {/* Sidebar - Updated for current schedule */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'white',
                zIndex: 10,
                background: 'rgba(10, 25, 41, 0.95)',
                padding: '20px',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                minWidth: '350px',
                maxWidth: '400px',
                maxHeight: '85vh',
                overflowY: 'auto'
            }}>
                <h2 style={{ fontSize: '18px', marginBottom: '5px' }}>Building Details</h2>
                <p style={{ fontSize: '12px', color: '#88c0ff', marginBottom: '15px' }}>
                    Hover over a building to see current class schedule.
                </p>
                <div 
                    id="buildingInfo"
                    dangerouslySetInnerHTML={{ __html: buildingInfo }}
                />
            </div>
        </div>
    );
};

export default CampusTrail;