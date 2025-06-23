var simulationParams = {
    Speed_Up_Rotation: 10,
	Speed_Up_Orbit: 2000,
};

function init() {	
	var scene = new THREE.Scene();
	var gui = new dat.GUI();
	var clock = new THREE.Clock();
	// load the environment map
	const scene_background = new THREE.TextureLoader().load("../assets/textures/space.jpg");
	scene.background = scene_background;

	const solar_system = new THREE.Group();
	solar_system.name = 'solar_system';
	scene.add(solar_system);
		//Earth
	const earth = getPlanet('earth');
	solar_system.add(earth);
	
	const stars = getPlanet('stars');
	solar_system.add(stars);
	
	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	
	// camera controls
	var cameraYPosition = new THREE.Group();
    var cameraZPosition = new THREE.Group();
    var cameraXPosition = new THREE.Group();

	cameraYPosition.name = 'cameraYPosition';
	cameraZPosition.name = 'cameraZPosition';
	cameraXPosition.name = 'cameraXPosition';

	cameraZPosition.add(camera);
	cameraYPosition.add(cameraZPosition);
	cameraXPosition.add(cameraYPosition);

	camera.position.z = 10;
	camera.position.x = 0;
	camera.position.y = 0;
	scene.add(camera);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var folder1 = gui.addFolder('Camera Position');
	folder1.add(camera.position, 'x', 0, 50).name('Camera X');
	folder1.add(camera.position, 'y', 0, 50).name('Camera Y');
	folder1.add(camera.position, 'z', 0, 50).name('Camera Z');
	folder1.open();
	
	// renderer
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.setClearColor('rgb(120, 120, 120)'); //Background Color
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	update(renderer, scene, camera, controls, clock);

	return scene;
}

function update(renderer, scene, camera, controls, clock) {
	controls.update();
	var time = clock.getElapsedTime();
	var solar_system = scene.getObjectByName('solar_system');
	//Planet Animation
	
	    //Earth Animation
	var earth = solar_system.getObjectByName('earth');
	earth.rotation.y += .005;
	var clouds = earth.getObjectByName("earth_Clouds");
	clouds.rotation.y += .005 * 0.1; // slower than planet
		//Moon Animation
	var moon = solar_system.getObjectByName("moon");

	moon.rotation.y += .005;
	const moonAngularSpeed = 0.1826;
	moon.position.x = -1.6 * Math.cos(time * moonAngularSpeed);
	moon.position.z = 1.4 * Math.sin(time * moonAngularSpeed);
	
	//Renderer
	
	renderer.render(scene, camera);
	requestAnimationFrame(function() {

		update(renderer, scene, camera, controls, clock);
	});
} 


var scene = init();
