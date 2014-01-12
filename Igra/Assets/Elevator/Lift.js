#pragma strict

private var pressedButton : boolean = false;
private var isElevatorUp : boolean = false;
//private var TEST : boolean = false;

var target : GameObject;

function OnMouseOver()
{
	pressedButton = true;
}

function OnMouseExit()
{
	pressedButton = false;
}

function OnMouseDown()
{
	
	if(isElevatorUp == false)
	{
		//TEST=true;
		//target = GameObject.Find("Bla");
		//target.renderer.enabled = false;
		animation.Play("Up");
		isElevatorUp = true;
	}
	else
	{
		target =GameObject.Find("Elevator");
		target.animation.Play("Down");
		isElevatorUp = false;
	}
}

function OnGUI()
{
	//if(pressedButton == true && TEST)
	if(pressedButton == true)
	{
		GUI.Box(new Rect(300,300,200,20), "Press to use lift");
	}
}