var fps_camera : Camera;
var quad_camera : Camera;
var static_camera : Camera;

private var gameplay_camera : Camera;

function Start()
{
	gameplay_camera = fps_camera;
	gameplay_camera.enabled = true;
}

function Update () 
{	
	if( Input.GetKeyUp("c") )
		SwitchGamePlayCameras();
}

function SwitchGamePlayCameras()
{
	if (gameplay_camera == quad_camera)
	{
		quad_camera.enabled = false;
		gameplay_camera = fps_camera;
	}
	else if (gameplay_camera == fps_camera)
	{
		gameplay_camera.enabled = false;
		gameplay_camera = quad_camera;
	}
	else
		Debug.Log("bad main camera!");
	
	gameplay_camera.enabled = true;
}

function EnableStaticCamera()
{
	fps_camera.enabled = false;
	quad_camera.enabled = false;
	static_camera.enabled = true;
}

function DisableStaticCamera()
{
	static_camera.enabled = false;
	gameplay_camera.enabled = true;
}

function SetQuadCamera()
{
	if(static_camera.enabled)
		static_camera.enabled = false;
	else if(fps_camera.enabled)
		fps_camera.enabled = false;
	
	quad_camera.enabled = true;
}