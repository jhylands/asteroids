var isGamepadActive = false;

function init()
{
    window.addEventListener('gamepadconnected', activateGamepad());
    window.addEventListener('gamepaddisconnected', deactivateGamepad());
};

function activateGamepad()
{
    isGamepadActive = true;
    console.log("connected");
}

function deactivateGamepad()
{
    //isGamepadActive = false;
    console.log("disconnected");
}

function updateGamepad()
{
    var gamepad = navigator.getGamepads()[0];
    var threshold = 0.15;
    
    if(gamepad.axes[0] < -(threshold)) 
    {
        player.position.x -= 2;
    } else if(gamepad.axes[0] > threshold) 
    {
        player.position.x += 2;
    } else if(gamepad.axes[1] < - threshold) 
    {
        player.position.y += 2;
    }
    else if(gamepad.axes[1] > threshold) 
    {
        player.position.y -= 2;
    }
    
    if(gamepad.axes[2] < -(threshold))
    {
        cameraX += 0.1;
    } else if (gamepad.axes[2] > threshold)
    {
        cameraX -= 0.1;
    } else if (gamepad.axes[3] < -(threshold))
    {
        cameraY += 0.1;
    } else if (gamepad.axes[3] > threshold)
    {
        cameraY -= 0.1;
    }
    
  };