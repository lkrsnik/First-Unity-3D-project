#pragma strict
var boxWidth = 300;
var boxHeight = 145;
var myFont : Font;

var guiSkin : GUISkin;
var fps_cam : Camera;
//private var MainMenu : Rect = Rect(10, 10, 200, 200);
private var msg:String;
private var isPause : boolean = false;
private var camMouse : Component;

function Start () 
{
	msg="";
	camMouse = fps_cam.GetComponent("MouseLook");
	Time.timeScale = 1;
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape)){
		gameObject.GetComponent(GameRules).setPause();
		isPause = !isPause;
	}
}

function OnGUI () 
{
	var myMenuStyle=GUIStyle();
	myMenuStyle.fontSize = 12;
	myMenuStyle.font = myFont;
	var myStyle = GUIStyle();
	myStyle.fontSize = 50;
	myStyle.font = myFont;
	GUI.skin.button.font = myFont;
	
	
		
	if(isPause){
		camMouse.active = false;
		if(guiSkin != null)
    		GUI.skin = guiSkin;
		GUI.Window(0, Rect(	Screen.width/2 - boxWidth/2
					   ,Screen.height/2 - boxHeight/2
					   ,boxWidth
					   ,boxHeight),
					    TheMainMenu, "");
	}
		//GUI.Label(Rect(	Screen.width - boxWidth
		//			   ,1
		//			   ,boxWidth
		//			   ,boxHeight),
		//		 msg, myStyle);
				 
	
}
function TheMainMenu () {
	if(GUILayout.Button("Resume")){
		camMouse.active = true;
		isPause = !isPause;
		gameObject.GetComponent(GameRules).setPause();
		//Time.timeScale = 1;
	//Application.LoadLevel("MainMenu");
	}
	if(GUILayout.Button("Main menu")){
		camMouse.active = true;
		//Time.timeScale = 1;
		gameObject.GetComponent(GameRules).setPause();
		Application.LoadLevel("MainScreen");
	}
	if(GUILayout.Button("Restart")){
		Application.LoadLevel("Landscape");
	}
	if(GUILayout.Button("Quit")){
		Application.Quit();
	}
}