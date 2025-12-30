// Cat & Mouse 3D Game
let scene, camera, renderer;
let mouse, cat;
let walls = [];
let smallPassages = [];
let floor;
let gameRunning = true;
let startTime;
let keys = {};

// Game settings
const MAZE_SIZE = 40;
const WALL_HEIGHT = 3;
const MOUSE_SIZE = 0.5;
const CAT_SIZE = 1.2;
const MOUSE_SPEED = 0.15;
const CAT_SPEED = 0.08;
const JUMP_POWER = 0.3;
const GRAVITY = 0.015;
const CATCH_DISTANCE = 1.5;

// Mouse physics
let mouseVelocity = new THREE.Vector3(0, 0, 0);
let isJumping = false;

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);
  scene.fog = new THREE.Fog(0x87ceeb, 20, 60);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 15, 15);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  const container = document.getElementById('gameCanvas');
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.left = -MAZE_SIZE;
  directionalLight.shadow.camera.right = MAZE_SIZE;
  directionalLight.shadow.camera.top = MAZE_SIZE;
  directionalLight.shadow.camera.bottom = -MAZE_SIZE;
  scene.add(directionalLight);

  // Create floor
  const floorGeometry = new THREE.PlaneGeometry(MAZE_SIZE * 2, MAZE_SIZE * 2);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x90ee90,
    roughness: 0.8,
  });
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Create maze
  createMaze();

  // Create mouse (player)
  const mouseGeometry = new THREE.SphereGeometry(MOUSE_SIZE, 16, 16);
  const mouseMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
  mouse.position.set(-15, MOUSE_SIZE, -15);
  mouse.castShadow = true;
  scene.add(mouse);

  // Add mouse ears
  const earGeometry = new THREE.SphereGeometry(MOUSE_SIZE * 0.4, 8, 8);
  const earMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb });
  const leftEar = new THREE.Mesh(earGeometry, earMaterial);
  leftEar.position.set(-MOUSE_SIZE * 0.5, MOUSE_SIZE * 0.5, MOUSE_SIZE * 0.3);
  mouse.add(leftEar);
  const rightEar = new THREE.Mesh(earGeometry, earMaterial);
  rightEar.position.set(MOUSE_SIZE * 0.5, MOUSE_SIZE * 0.5, MOUSE_SIZE * 0.3);
  mouse.add(rightEar);

  // Create cat (AI)
  const catGeometry = new THREE.BoxGeometry(CAT_SIZE, CAT_SIZE, CAT_SIZE * 1.2);
  const catMaterial = new THREE.MeshStandardMaterial({ color: 0xff8c00 });
  cat = new THREE.Mesh(catGeometry, catMaterial);
  cat.position.set(15, CAT_SIZE / 2, 15);
  cat.castShadow = true;
  scene.add(cat);

  // Add cat ears (triangular)
  const earShape = new THREE.ConeGeometry(CAT_SIZE * 0.3, CAT_SIZE * 0.5, 4);
  const catEarMaterial = new THREE.MeshStandardMaterial({ color: 0xff8c00 });
  const catLeftEar = new THREE.Mesh(earShape, catEarMaterial);
  catLeftEar.position.set(-CAT_SIZE * 0.3, CAT_SIZE * 0.6, CAT_SIZE * 0.2);
  catLeftEar.rotation.z = Math.PI;
  cat.add(catLeftEar);
  const catRightEar = new THREE.Mesh(earShape, catEarMaterial);
  catRightEar.position.set(CAT_SIZE * 0.3, CAT_SIZE * 0.6, CAT_SIZE * 0.2);
  catRightEar.rotation.z = Math.PI;
  cat.add(catRightEar);

  // Event listeners
  document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.code === 'Space' && !isJumping) {
      mouseVelocity.y = JUMP_POWER;
      isJumping = true;
    }
  });
  document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
  });

  document.getElementById('restartBtn').addEventListener('click', restartGame);

  window.addEventListener('resize', onWindowResize);

  startTime = Date.now();
  animate();
}

function createMaze() {
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const passageMaterial = new THREE.MeshStandardMaterial({ color: 0x4169e1 });

  // Outer walls
  createWall(-MAZE_SIZE, 0, 0, MAZE_SIZE * 2, WALL_HEIGHT, 1, wallMaterial);
  createWall(MAZE_SIZE, 0, 0, MAZE_SIZE * 2, WALL_HEIGHT, 1, wallMaterial);
  createWall(0, 0, -MAZE_SIZE, 1, WALL_HEIGHT, MAZE_SIZE * 2, wallMaterial);
  createWall(0, 0, MAZE_SIZE, 1, WALL_HEIGHT, MAZE_SIZE * 2, wallMaterial);

  // Inner maze walls - create a complex maze
  createWall(0, 0, -10, 20, WALL_HEIGHT, 1, wallMaterial);
  createWall(-10, 0, 0, 1, WALL_HEIGHT, 20, wallMaterial);
  createWall(10, 0, 10, 1, WALL_HEIGHT, 15, wallMaterial);
  createWall(-15, 0, 15, 10, WALL_HEIGHT, 1, wallMaterial);
  createWall(15, 0, -15, 8, WALL_HEIGHT, 1, wallMaterial);
  createWall(-5, 0, -20, 1, WALL_HEIGHT, 10, wallMaterial);
  createWall(5, 0, 5, 15, WALL_HEIGHT, 1, wallMaterial);

  // Small passages (only mouse can fit through)
  createSmallPassage(-20, 0, 0, 2, WALL_HEIGHT, 0.8, passageMaterial);
  createSmallPassage(20, 0, -5, 2, WALL_HEIGHT, 0.8, passageMaterial);
  createSmallPassage(0, 0, 20, 0.8, WALL_HEIGHT, 2, passageMaterial);
  createSmallPassage(-8, 0, -8, 1.5, WALL_HEIGHT, 0.8, passageMaterial);
}

function createWall(x, y, z, width, height, depth, material) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const wall = new THREE.Mesh(geometry, material);
  wall.position.set(x, y + height / 2, z);
  wall.castShadow = true;
  wall.receiveShadow = true;
  scene.add(wall);
  walls.push(wall);
}

function createSmallPassage(x, y, z, width, height, depth, material) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const passage = new THREE.Mesh(geometry, material);
  passage.position.set(x, y + height / 2, z);
  passage.castShadow = true;
  passage.receiveShadow = true;
  scene.add(passage);
  smallPassages.push(passage);

  // Add sparkles to indicate special passages
  const sparkleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const sparkleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  for (let i = 0; i < 5; i++) {
    const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
    sparkle.position.set(
      x + (Math.random() - 0.5) * width,
      y + height,
      z + (Math.random() - 0.5) * depth
    );
    scene.add(sparkle);
  }
}

function checkCollision(position, radius, obstacles) {
  for (let obstacle of obstacles) {
    const box = new THREE.Box3().setFromObject(obstacle);
    const expandedBox = box.expandByScalar(radius);

    if (expandedBox.containsPoint(position)) {
      return true;
    }
  }
  return false;
}

function updateMouse() {
  if (!gameRunning) return;

  const moveVector = new THREE.Vector3();

  // Keyboard controls
  if (keys['w'] || keys['arrowup']) moveVector.z -= 1;
  if (keys['s'] || keys['arrowdown']) moveVector.z += 1;
  if (keys['a'] || keys['arrowleft']) moveVector.x -= 1;
  if (keys['d'] || keys['arrowright']) moveVector.x += 1;

  if (moveVector.length() > 0) {
    moveVector.normalize();
    moveVector.multiplyScalar(MOUSE_SPEED);

    const newPosition = mouse.position.clone().add(moveVector);
    newPosition.y = mouse.position.y;

    // Check collision with walls
    if (!checkCollision(newPosition, MOUSE_SIZE, walls)) {
      mouse.position.x = newPosition.x;
      mouse.position.z = newPosition.z;
    }
  }

  // Apply gravity and jumping
  mouseVelocity.y -= GRAVITY;
  mouse.position.y += mouseVelocity.y;

  // Ground collision
  if (mouse.position.y <= MOUSE_SIZE) {
    mouse.position.y = MOUSE_SIZE;
    mouseVelocity.y = 0;
    isJumping = false;
  }

  // Camera follows mouse
  camera.position.x = mouse.position.x;
  camera.position.z = mouse.position.z + 15;
  camera.position.y = 15;
  camera.lookAt(mouse.position);
}

function updateCat() {
  if (!gameRunning) return;

  // Simple AI: move towards mouse
  const direction = new THREE.Vector3()
    .subVectors(mouse.position, cat.position)
    .normalize();

  const newPosition = cat.position
    .clone()
    .add(direction.multiplyScalar(CAT_SPEED));
  newPosition.y = CAT_SIZE / 2;

  // Check if cat can fit through (can't go through small passages)
  if (
    !checkCollision(newPosition, CAT_SIZE / 2, walls) &&
    !checkCollision(newPosition, CAT_SIZE / 2, smallPassages)
  ) {
    cat.position.x = newPosition.x;
    cat.position.z = newPosition.z;
  } else {
    // If blocked, try moving around obstacle
    const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x);
    const altPosition1 = cat.position
      .clone()
      .add(perpendicular.multiplyScalar(CAT_SPEED));
    const altPosition2 = cat.position
      .clone()
      .add(perpendicular.multiplyScalar(-CAT_SPEED));

    if (
      !checkCollision(altPosition1, CAT_SIZE / 2, walls) &&
      !checkCollision(altPosition1, CAT_SIZE / 2, smallPassages)
    ) {
      cat.position.x = altPosition1.x;
      cat.position.z = altPosition1.z;
    } else if (
      !checkCollision(altPosition2, CAT_SIZE / 2, walls) &&
      !checkCollision(altPosition2, CAT_SIZE / 2, smallPassages)
    ) {
      cat.position.x = altPosition2.x;
      cat.position.z = altPosition2.z;
    }
  }

  // Make cat look at mouse
  cat.lookAt(mouse.position);

  // Check if cat caught mouse
  const distance = cat.position.distanceTo(mouse.position);
  if (distance < CATCH_DISTANCE) {
    gameOver();
  }
}

function gameOver() {
  gameRunning = false;
  const survivalTime = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById('finalTime').textContent = survivalTime;
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('gameOver').style.display = 'block';
}

function restartGame() {
  // Reset positions
  mouse.position.set(-15, MOUSE_SIZE, -15);
  cat.position.set(15, CAT_SIZE / 2, 15);
  mouseVelocity.set(0, 0, 0);
  isJumping = false;

  // Reset game state
  gameRunning = true;
  startTime = Date.now();
  document.getElementById('instructions').style.display = 'block';
  document.getElementById('gameOver').style.display = 'none';
}

function updateTimer() {
  if (gameRunning) {
    const survivalTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('time').textContent = survivalTime;
  }
}

function animate() {
  requestAnimationFrame(animate);

  updateMouse();
  updateCat();
  updateTimer();

  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById('gameCanvas');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Start game when page loads
window.addEventListener('load', init);
