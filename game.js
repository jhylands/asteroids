// Scene object globals
var renderer, scene, camera, pointLight, spotLight;

// Player globals
//var player;
var obj;

// Camera globals
var rotMatrix = new THREE.Matrix4().identity();
var axisY = new THREE.Vector3(0, 1, 0);
var axisZ = new THREE.Vector3(0, 0, 1);

function setup()
{
    // Set scene up 
    createScene();
    
    // Initialises gamepad
    init();
    
    // Renders scene
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
    //scene.add(camera);
    camera.position.x = -10;
    camera.position.y = 3;
    
    // Start renderer
    renderer.setSize(width, height);
    
    // Attach DOM element (canvas)
    canvas.appendChild(renderer.domElement);
    
    playerCamera = new THREE.Object3D();
    playerCamera.add(camera);
    
    var loader = new THREE.ObjectLoader();
    loader.load("models/ship.js", function ( obj1 ) {
		var material = new THREE.MeshPhongMaterial( {
					color: 0xdddddd,
					specular: 0x222222,
					shininess: 35,
					map: THREE.ImageUtils.loadTexture( "images/shell.jpg" ),
					normalMap: THREE.ImageUtils.loadTexture( "images/shell.jpg" ),
					normalScale: new THREE.Vector2( 0.8, 0.8 ),
                                        side: THREE.DoubleSide
				} );
     obj1.children[4].children[0].material = material;
     obj1.children[4].children[1].material = material;
     obj1.children[4].children[2].material = material;
     obj1.children[0].material = material;
     obj1.children[1].material = material;
     obj1.children[2].material = material;
     obj1.children[5].material = material;
     obj1.children[6].material = new THREE.MeshBasicMaterial({color:0x0000ff});
     obj=obj1;
                                                     playerCamera.add(obj)});
    
    //playerCamera.add(player);
    scene.add(playerCamera);
    
    var asteroidLoader = new THREE.ObjectLoader();
    asteroidLoader.load("models/asteroidScene.js", function (asteroid){
        asteroid.children[1].material = new THREE.MeshLambertMaterial({
                color: 0xdddddd,
                                            specular: 0x222222,
                                            shininess: 35,
                map: THREE.ImageUtils.loadTexture( "images/asteroid.jpg" ),
                normalMap: THREE.ImageUtils.loadTexture( "images/asteroid-normal.png" ),
                                            normalScale: new THREE.Vector2( 0.8, 0.8 ),
                                            side: THREE.DoubleSide});
        scene.add(asteroid);
    });
    
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
    
    // Skybox
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
    var skyMaterial = new THREE.ShaderMaterial( 
        {
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        }); 
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyBox);
}

function draw()
{	
    // Draw the scene
    renderer.render(scene, camera);
    // Loop call
    requestAnimationFrame(draw);
    // Updates camera position
    graphicsUpdate();
    // Updates player position
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
    //playerCamera.rotation.x = cameraX;
    //playerCamera.rotation.y = cameraY;
    //var axisX = new THREE.Vector3(1, 0, 0);
    //var axisY = new THREE.Vector3(0, 1, 0);
    //camera.position.applyAxisAngle(axisX, cameraX);
    //camera.position.applyAxisAngle(axisY, cameraY);
    //cameraX = 0;
    //cameraY = 0;
    //var orbitalDistance = 100;
    //camera.position.set(orbitalDistance * Math.cos(cameraX) * Math.sin(cameraY), orbitalDistance * Math.sin(cameraX) * Math.sin(cameraY), orbitalDistance * Math.cos(cameraY));
    camera.lookAt(new THREE.Vector3(0,0,0));
}	