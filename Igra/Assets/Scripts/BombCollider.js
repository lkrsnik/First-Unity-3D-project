var boxWidth = 300;
var boxHeight = 50;
var myFont : Font;

var throwForce : float;
var Kr : float;

var splash : GameObject;
var fps_camera : Camera;
var water : GameObject;
var fpc : GameObject;

var bomb_image : Texture;

private var bomb : GameObject;
private var inTrigger : boolean;
private var inHand : boolean;
private var inWater : boolean;

function Start () {
	gameObject.renderer.enabled = false;
	splash.particleSystem.Stop(true);
	bomb = gameObject.transform.parent.gameObject;
	
	inTrigger = false;
	inHand = false;
	inWater = false;
}



function Update () 
{
	if( !inHand && inTrigger && Input.GetKeyUp("f"))
	{		
			bomb.renderer.enabled = false;
			inHand = true;
	}
	
	if( inHand && Input.GetMouseButtonUp(0) )
	{
		bomb.renderer.enabled = true;
		bomb.transform.position = fps_camera.transform.position;
		bomb.rigidbody.AddForce(fps_camera.transform.forward * throwForce);
		
		inHand = false;
		inTrigger = false;		
	}
	
	if(inWater)
		bomb.rigidbody.AddForce(-bomb.rigidbody.velocity*Kr);	
}

function OnTriggerEnter(myTrigger : Collider)
{	
	if(myTrigger.gameObject == water) 
	{
		inWater = true;
		fpc.SendMessage("bombInDaWater");
		
		splash.transform.position = gameObject.transform.position;
		splash.particleSystem.Play(true);
	}
	else if(myTrigger.gameObject == fpc)
	{
		inTrigger = true;
	}	
}

function OnTriggerExit(myTrigger : Collider)
{	
	if(myTrigger.gameObject == fpc)
		inTrigger = false;
}

function OnGUI () 
{	
	var myStyle = GUIStyle();
	myStyle.fontSize = 50;
	myStyle.font = myFont;
	
	if( !inHand && inTrigger )	
		GUI.Label(Rect(	Screen.width/2 - boxWidth/2
					   ,Screen.height/2 - boxHeight/2
					   ,boxWidth
					   ,boxHeight),
				 "(F) to pick up the bomb", myStyle);
	
	if( inHand )
		GUI.DrawTexture(Rect(16,16,64,64), bomb_image, 1, false);
	
}