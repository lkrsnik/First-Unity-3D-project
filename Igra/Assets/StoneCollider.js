#pragma strict

function Start () {
	gameObject.renderer.enabled = false;
}

private var inTrigger : boolean = false;
private var inHand : boolean = false;

function Update () 
{
	if( !inHand )
		CheckForTextVisibility();
	
	//check for input
	
}

function CheckForTextVisibility()
{
	if(inTrigger)
	{
		var obj = GameObject.Find("FPS_camera");
		if( obj.transform.rotation.eulerAngles.x <= 61 && obj.transform.rotation.eulerAngles.x > 40 )
		{
			GameObject.Find("PickUpBomb").guiText.enabled = true;
			return;
		}
	}	
	//else
	GameObject.Find("PickUpBomb").guiText.enabled = false;
}

function OnTriggerEnter()
{
	inTrigger = true;
}

function OnTriggerExit()
{
	inTrigger = false;
}