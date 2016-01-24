// Scene object globals
var renderer, scene, camera, pointLight, spotLight;

// Player globals
var player;

var cameraX = 0;
var cameraY = 0;

function setup()
{
    createScene();
    init();
    draw();
}

function createScene()
{
    // Set scene size
    var width = 640, height = 360;
    
    // Set camera
    var view_angle = 50, aspect = width/height, near = 0.1, far = 10000;
    
    // Get canvas 
    var canvas = document.getElementById("gameCanvas");
    
    // Create WebGL renderer, camera and scene
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
    scene = new THREE.Scene();
    
    // Add camera to scene and move it backwards
    scene.add(camera);
    camera.position.z = 320;
    
    // Start renderer
    renderer.setSize(width, height);
    
    // Attach DOM element (canvas)
    canvas.appendChild(renderer.domElement);
    
    // Create test player and add to scene
    var radius = 50, segments = 50, rings = 50;
    player = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), new THREE.MeshLambertMaterial({color: 0xD43001}));
    scene.add(player);
    player.position.x = 0;
    player.position.y = 0;
    player.receiveShadow = true;
    player.castShadow = true;
    
    // Create a point light and add to scene
    pointLight = new THREE.PointLight(0xF8D898);
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
    scene.add(pointLight);
		
    // Add a spot light to cast shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    var imagePrefix = "images/nebula-";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    var skyGeometry = new THREE.CubeGeometry( 500, 500, 500 );
    var imageURLs = [];
    for (var i = 0; i < 6; i++)
            imageURLs.push( imagePrefix + directions[i] + imageSuffix );
    var textureCube = THREE.ImageUtils.loadTextureCube( imageURLs );
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;
    var skyMaterial = new THREE.ShaderMaterial( {
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
    } ); 
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );
}

function draw()
{	
    // Draw the scene
    renderer.render(scene, camera);
    // Loop call
    requestAnimationFrame(draw);
    graphicsUpdate();
    playerMovement();
}

function playerMovement()
{
    if (isGamepadActive)
    {
        updateGamepad();
    }
}

function graphicsUpdate()
{
    var oD = 100;
    camera.position.set(oD * Math.cos(cameraX), Math.cos(cameraX) * Math.cos(cameraY), Math.sin(cameraX) * Math.sin(cameraY));
    camera.lookAt(player.position);
}