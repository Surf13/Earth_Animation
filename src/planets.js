
function getPlanet(planet){
    var object;
    switch(planet){
        case 'earth':
            object = getEarth();
            break; 
        case 'stars':
            object = getStars(15000);
            break;
        default:
            console.warn('Unknown planet: ' + planet);
            object = new THREE.Object3D();
            break;
    }

    return object;
}

function getEarth(){
    const earth_group = new THREE.Group();
    earth_group.name = 'earth_group';
    const earth = new THREE.Group();
    earth.name = 'earth';
    earth.rotation.z = -23.4 * Math.PI/180;
    earth_group.add(earth);

        //Sunlight
    const sun_light = new THREE.DirectionalLight(0xffffff,.8);
	sun_light.position.set(-10,3 ,15);
	earth_group.add(sun_light);

    //Planet
    const geometry = new THREE.IcosahedronGeometry(1,5);
    const material = new THREE.MeshStandardMaterial({
        wireframe: false,
        roughness: 0.5,
        map: new THREE.TextureLoader().load("../assets/textures/2k_earth_daymap.jpg"),
        blending: THREE.AdditiveBlending 
    });

    const planet_earth = new THREE.Mesh(geometry,material);
    planet_earth.name = 'earth';
    earth.add(planet_earth);

    //Planet Lights
    var lightMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_earth_nightmap.jpg"), 
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: .5,
        depthWrite: false
    });

    var lightMesh = new THREE.Mesh(geometry,lightMaterial);
    earth.add(lightMesh);

    //Clouds
     var cloudMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_earth_clouds.jpg"), 
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: .3,
        depthWrite: false
    });

    var cloudMesh = new THREE.Mesh(geometry,cloudMaterial);
    cloudMesh.scale.setScalar(1.01);
    cloudMesh.name="earth_Clouds";
    planet_earth.add(cloudMesh);

    //Aura (Frenal Material on top of clouds)
    var aura = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            color: 'rgb(109, 187, 220)',
            transparent: true,
            scale: 1.05,
            blending: THREE.AdditiveBlending,
            opacity: .15,
            depthWrite: false
        })
    );
    planet_earth.add(aura);

    //Moon Orbit
    var moon_geometry = new THREE.IcosahedronGeometry(.25,5);
    var moon_material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_moon.jpg"),
    });
    var moon = new THREE.Mesh(moon_geometry, moon_material);
    moon.name = 'moon';
    moon.rotation.x = 5* Math.PI / 180;
    moon.position.set(3.5, 0, 0);
    moon.receiveShadow = true;
    earth_group.add(moon);
    return earth_group;
}

function getStars(particleCount = 1000) {
    var particleGeometry = new THREE.Geometry();
    var particleMaterial = new THREE.PointsMaterial({
        color: 'rgb(255, 255, 255)',
        size: 2,
        map: new THREE.TextureLoader().load("../assets/textures/star.jpg"),

    });
    var particleDistance = 2000;
    
    
    for(var i=0;i<particleCount;i++){
        var x_pos = (Math.random() -.5)* particleDistance ;
        var y_pos = (Math.random() -.5)* particleDistance ;
        var z_pos = (Math.random() -.5)* particleDistance ; 
        
        // Create a new particle at the random position
        var particle = new THREE.Vector3(x_pos, y_pos, z_pos);

        particleGeometry.vertices.push(particle);
      
    }

    var particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particleSystem.name = 'stars'; 

    return particleSystem;
}
