$(document).ready(function() {
    const container = $('#cube-container')[0];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
  
    // Create the Rubik's Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
      new THREE.MeshBasicMaterial({ color: 0xffa500 }), // Orange
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
  
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame(animate);
  
      // Rotate the cube for demonstration purposes
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
  
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Handle window resize
    $(window).resize(function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });
  