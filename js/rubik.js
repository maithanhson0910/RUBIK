import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.138.3/examples/jsm/controls/OrbitControls.js';

$(document).ready(function() {
    const container = $('#cube-container')[0];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // OrbitControls to enable mouse interactions
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smoother control
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    const cubeSize = 0.5; // Giảm kích thước khối
    const offset = cubeSize * 1.1; // Cập nhật kích thước khối
    const spreadOffset = cubeSize * 2; // Cập nhật kích thước khối

    // Colors for outer faces
    const faceMaterials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
        new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
        new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
        new THREE.MeshBasicMaterial({ color: 0xffa500 }), // Orange
        new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
        new THREE.MeshBasicMaterial({ color: 0x000000 }), // Black for inner faces
    ];

    const cubes = [];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

                // Determine the material for each face
                const materials = [
                    (x === 1 ? faceMaterials[0] : faceMaterials[6]), // +X (Red or Black)
                    (x === -1 ? faceMaterials[1] : faceMaterials[6]), // -X (Green or Black)
                    (y === 1 ? faceMaterials[2] : faceMaterials[6]), // +Y (Blue or Black)
                    (y === -1 ? faceMaterials[3] : faceMaterials[6]), // -Y (Yellow or Black)
                    (z === 1 ? faceMaterials[4] : faceMaterials[6]), // +Z (Orange or Black)
                    (z === -1 ? faceMaterials[5] : faceMaterials[6]), // -Z (White or Black)
                ];

                const cube = new THREE.Mesh(geometry, materials);
                cube.userData.originalPosition = { x: x * offset, y: y * offset, z: z * offset };
                cube.position.set(cube.userData.originalPosition.x, cube.userData.originalPosition.y, cube.userData.originalPosition.z);
                scene.add(cube);
                cubes.push(cube);
            }
        }
    }

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        // Update controls
        controls.update();

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    $(window).resize(function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Spread cubes when "Spread Cubes" button is clicked
    $('#spread-button').click(function() {
        cubes.forEach(cube => {
            cube.position.set(
                cube.userData.originalPosition.x * 2, 
                cube.userData.originalPosition.y * 2, 
                cube.userData.originalPosition.z * 2
            );
        });
        $('#spread-button').hide();
        $('#combine-button').show();
    });

    // Combine cubes when "Combine Cubes" button is clicked
    $('#combine-button').click(function() {
        cubes.forEach(cube => {
            cube.position.set(
                cube.userData.originalPosition.x, 
                cube.userData.originalPosition.y, 
                cube.userData.originalPosition.z
            );
        });
        $('#combine-button').hide();
        $('#spread-button').show();
    });
});
