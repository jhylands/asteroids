var keyboard = new THREEx.KeyboardState();


function updateKeyboard()
{
    var move = new THREE.Vector3();
    
    if(keyboard.pressed("left")) 
    { move.set(0, 0, -1);}
    else if(keyboard.pressed("right")) 
    { move.set(0, 0, 1);}
    else if(keyboard.pressed("up"))
    { move.set(0, 1, 0);}
    else if(keyboard.pressed("down")) 
    { move.set(0, -1, 0);}
    
    if(keyboard.pressed("space")){
	move.add(new THREE.Vector3(2,0,0));
    }

    if(keyboard.pressed("s"))
    { cameraX = 0.5; }
    else if (keyboard.pressed("w"))
    { cameraX = -0.5; }
    else if (keyboard.pressed("d"))
    { cameraY = 0.5; } 
    else if (keyboard.pressed("a"))
    { cameraY = -0.5; }
    else
    {
	cameraX = 0;
	cameraY = 0;
    }
    
    var angleUp = -cameraY / 50;
    var angleRight = cameraX / 50;
    
    rotationY = new THREE.Matrix4().makeRotationAxis(axisY, angleUp);
    rotationZ = new THREE.Matrix4().makeRotationAxis(axisZ, angleRight);
    
    //axisY.applyMatrix4(rotationZ);
    //axisZ.applyMatrix4(rotationY);
    
    rotMatrix.multiply(rotationY).multiply(rotationZ);
    playerCamera.rotation.setFromRotationMatrix(rotMatrix);
    
    move.applyMatrix4(rotMatrix);
    playerCamera.position.add(move);
};
