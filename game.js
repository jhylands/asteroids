// Scene object globals
var renderer, scene, camera, pointLight, spotLight, asteroid, asteroidb, astMaterial;

// Player globals
//var player;
var obj;
//var beams = new Array();
var bullit = new Array();

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
    var view_angle = 50, aspect = width/height, near = 0.1, far = 1000000000;
    
    // Get canvas 
    var canvas = document.getElementById("gameCanvas");
    
    // Create WebGL renderer, camera and scene
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnabled = true;
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
    

//---------------
//LOD
//
    asteroidb = new THREE.LOD();
    var geometry1 = new THREE.IcosahedronGeometry( 10, 5);
    var astMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});
    var basicAsteroid = new THREE.Mesh(geometry1,astMaterial);
    asteroidb.addLevel(basicAsteroid,1000);
    scene.add(asteroidb);

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
     obj1.children[4].castShadow = true;
     obj1.children[4].receiveShadow = true;
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
    asteroidLoader.load("models/asteroidSceneK.js", function (asteroidload){
	asteroid = asteroidload;
	asteroid.children[1].material = astMaterial;
	asteroid.children[1].castShadow = true;
	asteroid.children[1].receiveShadow = true;
        asteroidb.addLevel(asteroid.children[1],100);
    });

    var asteroidLoader2 = new THREE.ObjectLoader();
    asteroidLoader.load("models/asteroidScene.js", function (asteroidload){
	asteroid1 = asteroidload;
	asteroid1.children[1].material = astMaterial;
	asteroid1.children[1].castShadow = true;
	asteroid1.children[1].receiveShadow = true;
        asteroidb.addLevel(asteroid1.children[1],10);
    });
    
    // Create a point light and add to scene
    pointLight = new THREE.PointLight(0xcccccc);
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
//    scene.add(pointLight);
		
    // Add a spot light to cast shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1;
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 4096;
    spotLight.shadowMapHeight = 4096;
    scene.add(spotLight);
    
    // Skybox
    var imagePrefix = "images/nebula-";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    var skyGeometry = new THREE.CubeGeometry( 500000000, 500000000, 500000000 );
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
    /*if (isGamepadActive)
    {
        updateGamepad();
    }else{*/
	updateKeyboard();
    //}
}

function graphicsUpdate()
{
    asteroidb.update(playerCamera.children[0]);
    asteroidb.rotation.x+=0.01;
    //asteroid.children[1].rotation.y+=0.005;
    //asteroid.children[1].rotation.z+=0.015;
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
    //updateBeams();
    moveBullits(bullit);
}

function updateBeams()
{
    for (i = 0; i < beams.length; i++)
    {
        beams[i].position.add(beams[i].rotation);
    }
}

function createBullit(position,GBD){
	//GBD is a bool true is the user false is alian
	//define the bullit variable
	var bullits = new Object();
	bullits.velocity = new THREE.Vector3(1, 0, 0).applyMatrix4(rotMatrix);
	//bullits.velocity.applyMatrix4(rotMatrix);
	//get weather the bullit should be shown
	bullits.shown = true;
	//the z componet is defines after the if GBD
	var Geometry = new THREE.CylinderGeometry(0.1,0.1,1);
	if(!GBD){
            //set the bullits coming towards you
            bullits.velocity.z=1;
            //set the color
            var Material = new THREE.MeshBasicMaterial( { color:0xFF0000,transparent:true,opacity:0.8  } );
            //set them as alian
            bullits.own = false;
	}else{
            //set the bullits going away from you
            bullits.velocity.z=-1;
            //set the color
            var Material = new THREE.MeshBasicMaterial( { color:0x00FFFF ,transparent:true,opacity:0.8} );
            bullits.own = true;
	}
	bullits.object = new THREE.Mesh( Geometry,Material );
	bullits.object.position.set(position.x,position.y,position.z+1);
	bullits.object.rotation.setFromRotationMatrix(rotMatrix);
	//the object is not yet added
	return bullits;
	}
        
    function moveBullits(bullits){
            for(i=0;i<bullits.length;i++){
                    bullits[i].object.position.add(bullits[i].velocity);
            }
	}
        
        function UpdatePosition(asteroid){
            asteroid.object.position.x+=asteroid.velocity.x;
            asteroid.object.position.y+=asteroid.velocity.y;
            asteroid.object.position.z+=asteroid.velocity.z;
	}

