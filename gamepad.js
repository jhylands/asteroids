var isGamepadActive = false;

function init()
{
    window.addEventListener('gamepadconnected', activateGamepad());
    window.addEventListener('gamepaddisconnected', deactivateGamepad());
};

function activateGamepad()
{
    isGamepadActive = true;
    console.log("Connected");
}

function deactivateGamepad()
{
    // Gamepad seems to disconnects itself after being activated
    console.log("Disconnected");
}

function updateGamepad()
{
    var move = new THREE.Vector3();
    var gamepad = navigator.getGamepads()[0];
    var threshold = 0.15;
    
    if(gamepad.axes[0] < -(threshold)) 
    {move.set(0, 0, -1);}
    else if(gamepad.axes[0] > threshold) 
    {move.set(0, 0, 1);}
    else if(gamepad.axes[1] < -(threshold))
    {move.set(0, 1, 0);}
    else if(gamepad.axes[1] > threshold) 
    {move.set(0, -1, 0);}
    else if(gamepad.buttons[7].pressed)
    {move.set(1, 0, 0);}
    
    /*if(gamepad.axes[2] < -(threshold))
    { cameraX += 0.1; }
    else if (gamepad.axes[2] > threshold)
    { cameraX -= 0.1; }
    else if (gamepad.axes[3] < -(threshold))
    { cameraY += 0.1; } 
    else if (gamepad.axes[3] > threshold)
    { cameraY -= 0.1; }*/
    
    var angleUp = -gamepad.axes[2] / 50;
    var angleRight = gamepad.axes[3] / 50;
    
    //axisZ.applyAxisAngle(axisY, angleUp);
    //playerCamera.rotateOnAxis(axisY, angleUp);
    
    //axisY.applyAxisAngle(axisZ, angleRight);
    //playerCamera.rotateOnAxis(axisZ, angleRight);
    
    rotationY = new THREE.Matrix4().makeRotationAxis(axisY, angleUp);
    rotationZ = new THREE.Matrix4().makeRotationAxis(axisZ, angleRight);
    
    //axisY.applyMatrix4(rotationZ);
    //axisZ.applyMatrix4(rotationY);
    
    rotMatrix.multiply(rotationY).multiply(rotationZ);
    playerCamera.rotation.setFromRotationMatrix(rotMatrix);
    
    move.applyMatrix4(rotMatrix);
    playerCamera.position.add(move);    
    
    if(gamepad.buttons[5].pressed)
    {
        /*beamIndex = beams.length;
        beams[beamIndex] = new THREE.Mesh(new THREE.MeshBasicMaterial({color: 0xFF0000}), new THREE.CylinderGeometry(0.1, 0.1, 1));
        beams[beamIndex].position = playerCamera.position;
        beams[beamIndex].rotation.setFromRotationMatrix(rotMatrix);
        scene.add(beams[beamIndex]);*/
        blength = bullit.length;
        bullit[blength] = createBullit(playerCamera.position,true);
	scene.add(bullit[blength].object);
    }
};