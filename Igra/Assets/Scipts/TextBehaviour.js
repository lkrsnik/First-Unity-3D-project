#pragma strict

var isQuitButton : boolean = false;
var isInstrButton : boolean = false;
var isPlayButton : boolean = false;
var isBackButton : boolean = false;

function OnMouseEnter()
{
	renderer.material.color = Color.green;
}

function OnMouseExit()
{
	renderer.material.color = Color.white;
}

function OnMouseUp()
{
	if( isQuitButton )
		Application.Quit();
	else if( isInstrButton || isBackButton )
		GameObject.Find('MainBoard').SendMessage('instructionClicked', null);	
	else if( isPlayButton )
		Application.LoadLevel("Landscape");//go to level
	
}