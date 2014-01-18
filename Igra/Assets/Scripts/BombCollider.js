var splash : GameObject;
var fps_camera : Camera;
var water : GameObject;
var fpc : GameObject;
var bomb_image : Texture2D;
var Kr : float;
var throwForce : float;

private var trigger : GameObject;
private var bomb : GameObject;
private var inTrigger : boolean;
private var inHand : boolean;
private var inWater : boolean;


function Start () 
{
	for(var child in transform)
		if(child.gameObject.name == "BombCollider")
		{
			trigger = child.gameObject;
			break;
		}
	
	inTrigger = false;
	inHand = false;
	inWater = false;
}

function Update () 
{
	if( !inHand && inTrigger && Input.GetKeyUp("f"))
	{		
			renderer.enabled = false;
			SetInHand(true);
	}
	
	if( inHand && Input.GetMouseButtonUp(0) )
	{
		renderer.enabled = true;
		transform.position = fps_camera.transform.position;
		rigidbody.AddForce(fps_camera.transform.forward * throwForce);
		
		SetInHand(false);
		SetInTrigger(false);
	}
	
	if(inWater)
		rigidbody.AddForce(-rigidbody.velocity*Kr);	
}

function OnTriggerEnter(myTrigger : Collider)
{
	if(myTrigger.gameObject == water && inWater != true) 
	{
		inWater = true;
		fpc.SendMessage("bombInDaWater");
		transform.parent.gameObject.SendMessage("SetInWater", gameObject);
		
		splash.transform.position = gameObject.transform.position;
		splash.particleSystem.Play(true);
		
	}
	else if(myTrigger.gameObject == fpc)
	{
		SetInTrigger(true);
	}	
}

function SetInHand(bool : boolean)
{
	inHand = bool;
	transform.parent.gameObject.SendMessage("SetInHand", bool);
}

function SetInTrigger(bool: boolean)
{
	inTrigger = bool;
	transform.parent.gameObject.SendMessage("SetInTrigger", bool);
}

function OnTriggerExit(myTrigger : Collider)
{	
	if(myTrigger.gameObject == fpc)
		SetInTrigger(false);
}