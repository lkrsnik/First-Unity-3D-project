#pragma strict

var boxWidth = 300;
var boxHeight = 50;
var menuWidth = 300;
var menuHeight = 110;
var myFont : Font;
var timer : float = 10 ;
var guiSkin : GUISkin;

private var msg : String;
private var waterLevel : float;
private var isOver : boolean;
private var isWon : boolean;
private var camMouse : Component;
//private var camMouse : Component;

function Start () {
	waterLevel=GameObject.Find("Water").transform.position.y;
	isOver=false;
	isWon=false;
	Time.timeScale = 1;
	camMouse = gameObject.Find("FPS_camera").GetComponent("MouseLook");
}

function Update () {
	UpdateWaterCollision();
	UpdateTimer();
	
}
function UpdateWaterCollision () {
	if(gameObject.transform.position.y+0.4<waterLevel){
		//Screen.showCursor = !Screen.showCursor;
		//Screen.showCursor = true;
		camMouse.active = false;
		isOver = true;
		if(isOver)
			Time.timeScale = 0;
		else
			Time.timeScale = 1;
	}
}
function UpdateTimer () {
	timer -= Time.deltaTime;
	if (timer > 0){
		//Screen.showCursor = !Screen.showCursor;
		//Screen.showCursor = true;
		
		msg=timer.ToString("F0");
	} else {
		camMouse.active = false;
		isOver = true;
		if(isOver)
			Time.timeScale = 0;
		else
			Time.timeScale = 1;
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
			 
			 
	if(isOver){
		if(isWon){
			GUI.Label(Rect(	Screen.width/2 - menuWidth/2
					   ,Screen.height/2 - menuHeight/2 -85
					   ,menuWidth
					   ,menuHeight),
				 "You have won the game!", myStyle);
		} else {
			GUI.Label(Rect(	Screen.width/2 - menuWidth/2
					   ,Screen.height/2 - menuHeight/2 -85
					   ,menuWidth
					   ,menuHeight),
				 "Your time's up or you're dead!", myStyle);
		}
		if(guiSkin != null)
    		GUI.skin = guiSkin;
		GUI.Window(0, Rect(	Screen.width/2 - menuWidth/2
					   ,Screen.height/2 - menuHeight/2
					   ,menuWidth
					   ,menuHeight),
					    TheMainMenu, "Pause Menu");
	}
		//GUI.Label(Rect(	Screen.width - boxWidth
		//			   ,1
		//			   ,boxWidth
		//			   ,boxHeight),
		//		 msg, myStyle);
				 
	
}
function TheMainMenu () {
	if(GUILayout.Button("Main menu")){
		camMouse.active = true;
		Time.timeScale = 1;
		Application.LoadLevel("MainScreen");
	}
	if(GUILayout.Button("Restart")){
		camMouse.active = true;
		Time.timeScale = 1;
		Application.LoadLevel("Landscape");
	}
	if(GUILayout.Button("Quit")){
		Application.Quit();
	}
}
