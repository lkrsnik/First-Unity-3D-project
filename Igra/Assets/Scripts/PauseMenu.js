var boxWidth = 300;
var boxHeight = 145;
var myFont : Font;

var guiSkin : GUISkin;
var fps_cam : Camera;
var static_cam : Camera;
//private var MainMenu : Rect = Rect(10, 10, 200, 200);
private var msg:String;
private var isPause : boolean = false;

function Start () 
{
	msg="";
	Time.timeScale = 1;
}

function Update () 
{
	if (Input.GetKeyDown(KeyCode.Escape))
	{
		gameObject.GetComponent(GameRules).setPause();
		isPause = !isPause;
		if(isPause)
			static_cam.SendMessage("EnableStaticCamera");
		else
			static_cam.SendMessage("DisableStaticCamera");
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
			
	if(isPause)
	{
		if(guiSkin != null)
    		GUI.skin = guiSkin;
		GUI.Window(0, Rect(Screen.width/2 - boxWidth/2,
					       Screen.height/2 - boxHeight/2,
					       boxWidth,
					       boxHeight),
				   TheMainMenu, "");
	}				 
	
}
function TheMainMenu () 
{
	if( GUILayout.Button("Resume") )
	{
		isPause = !isPause;
		gameObject.GetComponent(GameRules).setPause();
		static_cam.SendMessage("DisableStaticCamera");
	}
	if(GUILayout.Button("Main menu"))
	{
		Application.LoadLevel("MainScreen");
	}
	if(GUILayout.Button("Restart"))
	{
		Application.LoadLevel("Landscape");
	}
	if(GUILayout.Button("Quit"))
	{
		Application.Quit();
	}
}