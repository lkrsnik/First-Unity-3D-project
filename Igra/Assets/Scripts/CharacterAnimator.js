#pragma strict

private var scrpt : CharacterMotor;

private var walk : boolean;
private var jump : boolean;

function Start()
{
	scrpt = GameObject.Find("First Person Controller").GetComponent(CharacterMotor);
	
	walk = false;
	jump = false;
}

function Update () 
{
	jump = scrpt.IsJumping();
	walk = scrpt.inputMoveDirection != Vector3.zero;
	
	if( jump )
		animation.Play("jump");
	else if( walk )
		animation.Play("walk");
	else
		animation.Play("idle");
	
}