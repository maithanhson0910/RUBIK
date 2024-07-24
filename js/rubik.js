import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.138.3/examples/jsm/controls/OrbitControls.js';

$(document).ready(function() {
    const container = $('#cube-container')[0];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    const cubeSize = 0.5;
    const offset = cubeSize * 1.1;
    const spreadOffset = cubeSize * 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const faceMaterials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
        new THREE.MeshBasicMaterial({ color: 0xffa500 }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
    ];

    const cubes = [];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const materials = [
                    (x === 1 ? faceMaterials[0] : faceMaterials[6]),
                    (x === -1 ? faceMaterials[1] : faceMaterials[6]),
                    (y === 1 ? faceMaterials[2] : faceMaterials[6]),
                    (y === -1 ? faceMaterials[3] : faceMaterials[6]),
                    (z === 1 ? faceMaterials[4] : faceMaterials[6]),
                    (z === -1 ? faceMaterials[5] : faceMaterials[6]),
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
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    $(window).resize(function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    $('#spread-button').click(function() {
        cubes.forEach(cube => {
            new TWEEN.Tween(cube.position)
                .to({
                    x: cube.userData.originalPosition.x * 2,
                    y: cube.userData.originalPosition.y * 2,
                    z: cube.userData.originalPosition.z * 2
                }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        });
        $('#spread-button').hide();
        $('#combine-button').show();
    });

    $('#combine-button').click(function() {
        cubes.forEach(cube => {
            new TWEEN.Tween(cube.position)
                .to({
                    x: cube.userData.originalPosition.x,
                    y: cube.userData.originalPosition.y,
                    z: cube.userData.originalPosition.z
                }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        });
        $('#combine-button').hide();
        $('#spread-button').show();
    });

    function update() {
        TWEEN.update();
        requestAnimationFrame(update);
    }

    update();
});
