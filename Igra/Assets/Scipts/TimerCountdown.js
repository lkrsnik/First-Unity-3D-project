#pragma strict

var boxWidth = 300;
var boxHeight = 50;
var myFont : Font;
var timer : float = 10 ;

private var msg : String;
function Start () {
	Time.timeScale = 1.0f;
}

function Update () {
	timer -= Time.deltaTime;
	if (timer > 0){
		msg=timer.ToString("F0");
	} else {
		Application.LoadLevel("MainScreen");
		msg = "TIME OVER\nPress X to restart";
	if (Input.GetKeyDown("x")){ // reload the same level
		Application.LoadLevel("Landscape");
	}
	}
}

function OnGUI () 
{
	var myStyle = GUIStyle();
	myStyle.fontSize = 50;
	myStyle.font = myFont;
	
	
		
		
		GUI.Label(Rect(	Screen.width - boxWidth
					   ,1
					   ,boxWidth
					   ,boxHeight),
				 msg, myStyle);
}