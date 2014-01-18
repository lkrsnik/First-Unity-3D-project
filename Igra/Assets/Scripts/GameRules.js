var boxWidth = 300;
var boxHeight = 50;
var menuWidth = 300;
var menuHeight = 120;
var myFont : Font;
var timer : float = 10 ;
var guiSkin : GUISkin;

var static_cam : Camera;
var water : GameObject;

private var msg : String;
private var waterLevel : float;
private var isOver : boolean;
private var isWon : boolean;
private var isPause :boolean;
private var kabum : boolean;
private var bombs_left : int;

private var EndStr : String;

function Start () {
	waterLevel=water.transform.position.y;
	isOver=false;
	isWon=false;
	isPause = false;
	kabum=false;
	Time.timeScale = 1;
	
	bombs_left = GameObject.FindGameObjectsWithTag("Bombs").Length;	
}

function setPause()
{
	isPause = !isPause; 
}

function Update () {
	UpdateWaterCollision();
	UpdateTimer();
	
	if(isOver)
		Time.timeScale *= 0.99; //de se lepo ustavi
	else if(isPause)
		Time.timeScale = 0;
	else
		Time.timeScale = 1;
}

function UpdateWaterCollision ()
{
	if(gameObject.transform.position.y+0.4<waterLevel)
		SetEnding("You can not swim!");
}

function UpdateTimer () 
{
	timer -= Time.deltaTime;
	if (timer > 0)
	{
		msg=timer.ToString("F0");
		
		if( timer <= 0.25 && !kabum && !isWon)
		{
			var gos: GameObject[];
			gos = GameObject.FindGameObjectsWithTag("Bombs");
			for(var i=0; i<gos.length; i++)
				gos[i].particleSystem.Play(true);
			kabum = true;
		}
	} 
	
	else 
		SetEnding("Your time's up!");

}

function bombInDaWater()
{
	bombs_left -= 1;
	if(bombs_left == 0 && !kabum)
	{
		SetEnding("You have won the game!");
		isWon = true;
	}
}

function SetEnding(str: String)
{
	static_cam.SendMessage("SetQuadCamera");
	isOver = true;
	EndStr = str;
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
		GUI.Label(Rect(	Screen.width/2 - menuWidth/2
					   ,Screen.height/2 - menuHeight/2 -85
					   ,menuWidth
					   ,menuHeight),
				EndStr, myStyle);
		
		if(guiSkin != null)
    		GUI.skin = guiSkin;
		GUI.Window(0, Rect(	Screen.width/2 - menuWidth/2
					   ,Screen.height/2 - menuHeight/2
					   ,menuWidth
					   ,menuHeight),
					    TheMainMenu, "");
	}
	
	var bl : String = "bombs left: " + bombs_left;
	GUI.Label(Rect(	Screen.width - boxWidth
				   ,Screen.height - boxHeight
				   ,boxWidth
				   ,boxHeight),
			 bl, myStyle);
				 
	
}
function TheMainMenu () {
	
	if(GUILayout.Button("Main menu"))
		Application.LoadLevel("MainScreen");
		
	if(GUILayout.Button("Restart"))
		Application.LoadLevel("Landscape");
	
	if(GUILayout.Button("Quit"))
		Application.Quit();
}
