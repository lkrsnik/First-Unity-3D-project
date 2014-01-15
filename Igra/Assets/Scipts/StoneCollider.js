var boxWidth = 300;
var boxHeight = 50;
var myFont : Font;

var throwForce : float;
var Kr : float;
var splash : GameObject;

private var bomb : GameObject;

function Start () {
	gameObject.renderer.enabled = false;
	splash.particleSystem.Stop(true);
	bomb = gameObject.transform.parent.gameObject;
}

private var inTrigger : boolean = false;
private var inHand : boolean = false;
private var showText : boolean = false;
private var inWater : boolean = false;

function Update () 
{
	if( !inHand )
	{
		if(inTrigger)
		{
			var obj = GameObject.Find("FPS_camera");
			if( obj.transform.rotation.eulerAngles.x <= 61 && obj.transform.rotation.eulerAngles.x > 40 )
				showText = true;
		}	
		else
			showText = false;
		
		if( showText && Input.GetKeyUp("f") )
		{
			bomb.renderer.enabled = false;
			inHand = true;
			showText = false;
		}
	} else showText = false;
	
	if( inHand && Input.GetMouseButtonUp(0) )
	{
		var cm: GameObject = GameObject.Find("FPS_camera");
		
		bomb.renderer.enabled = true;
		bomb.transform.position = cm.transform.position;
		bomb.rigidbody.AddForce(cm.transform.forward * throwForce);
		
		inHand = false;		
	}
	
	if(inWater)
		bomb.rigidbody.AddForce(-bomb.rigidbody.velocity*Kr);	
}

function OnTriggerEnter(myTrigger : Collider)
{	
	if(myTrigger.gameObject.name == "Water") 
	{
		inWater = true;
		
		splash.transform.position = gameObject.transform.position;
		splash.particleSystem.Play(true);
	}
	else if(myTrigger.gameObject.name == "First Person Controller")
	{
		inTrigger = true;
	}	
}

function OnTriggerExit(myTrigger : Collider)
{
	if(myTrigger.gameObject.name == "First Person Controller")
	{
		inTrigger = false;
		showText = false;
	}
}

function OnGUI () 
{	
	var myStyle = GUIStyle();
	myStyle.fontSize = 50;
	myStyle.font = myFont;
	
	if( showText )	
		GUI.Label(Rect(	Screen.width/2 - boxWidth/2
					   ,Screen.height/2 - boxHeight/2
					   ,boxWidth
					   ,boxHeight),
				 "(F) to pick up the bomb", myStyle);
	
	if( inHand )
		GUI.Box(Rect(16,16,128,32),"Show a bomb here");
	
}