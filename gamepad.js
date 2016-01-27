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
    { move.set(0, 0, -1);}
    else if(gamepad.axes[0] > threshold) 
    { move.set(0, 0, 1);}
    else if(gamepad.axes[1] < -(threshold))
    { move.set(0, 1, 0);}
    else if(gamepad.axes[1] > threshold) 
    { move.set(0, -1, 0);}
    
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
};